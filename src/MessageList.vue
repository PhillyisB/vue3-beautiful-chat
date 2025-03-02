<template>
  <div
    ref="scrollList"
    class="sc-message-list"
    @scroll="handleScroll"
  >
    <Message
      v-for="(message, idx) in messages"
      :key="idx"
      :message="message"
      :colors="colors"
      :message-styling="messageStyling"
      :show-confirmation-deletion="showConfirmationDeletion"
      :confirmation-deletion-message="confirmationDeletionMessage"
      @remove="$emit('remove', message)"
    >
      <template #user-avatar="scopedProps">
        <slot name="user-avatar" :user="scopedProps.user" :message="scopedProps.message" />
      </template>
      <template #text-message-body="scopedProps">
        <slot
          name="text-message-body"
          :message="scopedProps.message"
          :message-text="scopedProps.messageText"
          :message-colors="scopedProps.messageColors"
          :me="scopedProps.me"
        />
      </template>
      <template #system-message-body="scopedProps">
        <slot name="system-message-body" :message="scopedProps.message" />
      </template>
      <template #text-message-toolbox="scopedProps">
        <slot name="text-message-toolbox" :message="scopedProps.message" :me="scopedProps.me" />
      </template>
    </Message>
    <Message
      v-show="showTypingIndicator !== ''"
      :message="{author: showTypingIndicator, type: 'typing'}"
      :colors="colors"
      :message-styling="messageStyling"
      :show-confirmation-deletion="showConfirmationDeletion"
      :confirmation-deletion-message="confirmationDeletionMessage"
    />
  </div>
</template>

<script>
import Message from "./Message.vue"
import chatIcon from "./assets/chat-icon.svg"

let resizeObserver

export default {
  components: {
    Message
  },
  props: {
    messages: {
      type: Array,
      required: true
    },
    showTypingIndicator: {
      type: String,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    },
    showConfirmationDeletion: {
      type: Boolean,
      required: true
    },
    confirmationDeletionMessage: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      initialScrollTop: null
    }
  },
  computed: {
    defaultChatIcon () {
      return chatIcon
    }
  },
  mounted () {
    this.watchScrollList()
    this.$nextTick(this._scrollDown())
  },
  beforeUnmount () {
    resizeObserver.unobserve(this.$refs.scrollList)
  },
  updated () {
    if (this.shouldScrollToBottom()) this.$nextTick(this._scrollDown())
  },
  methods: {
    _scrollDown () {
      this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
      !this.initialScrollTop ? this.initialScrollTop = this.$refs.scrollList.scrollTop : "";
    },
    handleScroll (e) {
      if (e.target.scrollTop === 0) {
        this.$emit("scrollToTop")
      }
    },
    shouldScrollToBottom () {
      const scrollTop = this.$refs.scrollList.scrollTop
      const scrollable = scrollTop > this.$refs.scrollList.scrollHeight - 600
      return this.alwaysScrollToBottom || scrollable
    },
    watchScrollList () {
      resizeObserver = new ResizeObserver(() => {
        const value = this.$refs.scrollList.scrollHeight - this.$refs.scrollList.scrollTop
        if (
          this.initialScrollTop === this.$refs.scrollList.scrollTop ||
          (this.$refs.scrollList.scrollTop > this.initialScrollTop &&
            value > this.$refs.scrollList.offsetHeight)
        ) {
          this._scrollDown()
        }
      })

      resizeObserver.observe(this.$refs.scrollList)
    }
  }
}
</script>

<style scoped>
.sc-message-list {
  height: 80%;
  overflow-y: auto;
  background-size: 100%;
  padding: 0px;
  border-bottom: 0.5px solid lightgray;
}

</style>
