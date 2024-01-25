<template>
  <div :id="message.id" class="sc-message">
    <div
      class="sc-message--content"
      :class="{
        sent: message.author === 'me',
        received: message.author !== 'me' && message.type !== 'system',
        system: message.type === 'system'
      }"
    >
      <slot name="user-avatar" :message="message" :user="user">
        <div
          v-if="message.type !== 'system' && authorName && authorName !== 'me'"
          v-tooltip="authorName"
          :title="authorName"
          class="sc-message--avatar"
          :style="{
            backgroundImage: `url(${chatImageUrl})`
          }"
        />
      </slot>

      <TextMessage
        v-if="message.type === 'text'"
        :message="message"
        :message-colors="messageColors"
        :message-styling="messageStyling"
        :show-confirmation-deletion="showConfirmationDeletion"
        :confirmation-deletion-message="confirmationDeletionMessage"
        @remove="$emit('remove')"
      >
        <template #default="scopedProps">
          <slot
            name="text-message-body"
            :message="scopedProps.message"
            :message-text="scopedProps.messageText"
            :message-colors="scopedProps.messageColors"
            :me="scopedProps.me"
          />
          <p class="sc-message--text-content" v-html="scopedProps.messageText" />
          <slot v-if="scopedProps.message.hasAttachment" class="sc-message--file pt-1"> 
            <div :horizontal="true" :wrap="true" :tokens="{ childrenGap: 5 }">
              <span class="citationLearnMore">Sources:</span>
              <a
                v-for="(source) in scopedProps.message.citations"
                :key="source"
                class="citation"
                :title="source.docTitle"
                :to="'/browse/'+ source.link"
                @click="openLink(source.link)"
              >
                <br />
                {{ source.docTitle }} - {{ source.pageTitle }}
              </a>
            </div>
          </slot>
        </template>
        
        <template #text-message-toolbox="scopedProps">
          <slot name="text-message-toolbox" :message="scopedProps.message" :me="scopedProps.me" />
        </template>    
      </TextMessage>
      <EmojiMessage v-else-if="message.type === 'emoji'" :data="message.data" />
      <FileMessage
        v-else-if="message.type === 'file'"
        :data="message.data"
        :message-colors="messageColors"
      />
      <TypingMessage v-else-if="message.type === 'typing'" :message-colors="messageColors" />
      <SystemMessage
        v-else-if="message.type === 'system'"
        :data="message.data"
        :message-colors="messageColors"
      >
        <slot name="system-message-body" :message="message.data" />
      </SystemMessage>
    </div>
  </div>
</template>

<script>
import TextMessage from "./messages/TextMessage.vue"
import FileMessage from "./messages/FileMessage.vue"
import EmojiMessage from "./messages/EmojiMessage.vue"
import TypingMessage from "./messages/TypingMessage.vue"
import SystemMessage from "./messages/SystemMessage.vue"
import chatIcon from "./assets/chat-icon.svg"

export default {
  components: {
    TextMessage,
    FileMessage,
    EmojiMessage,
    TypingMessage,
    SystemMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
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
  computed: {
    authorName () {
      return this.user && this.user.name
    },
    chatImageUrl () {
      return (this.user && this.user.imageUrl) || chatIcon
    },
    messageColors () {
      return this.message.author === "me" ? this.sentColorsStyle : this.receivedColorsStyle
    },
  }
}
</script>

<style lang="scss">
.sc-message {
  margin-left: 0px 11px 0px;
  width: 98%;
  margin-bottom: 1rem ;
  padding-bottom: 0px;
  flex-direction: column;
    flex: 1 1 0;
    display: flex;

    .sc-message--edited {
    opacity: 0.7;
    word-wrap: normal;
    font-size: xx-small;
    text-align: center;
  }
}

.sc-message--content {
  width: 100%;
  display: flex;
}

.sc-message--content.sent {
  justify-content: flex-end;
}

.sc-message--content.sent .sc-message--text {
    background-color: #3E63DD ;
    max-width: calc(100% - 120px);
    word-wrap: break-word;
    margin-left: auto;
    border-radius: 10px 10px 0 10px;
    color: #fff;

}


.sc-message--content.system {
  justify-content: center;
}

.sc-message--content.sent .sc-message--avatar {
  display: none;
}

.sc-message--avatar {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  align-self: center;
  margin-right: 15px;
}

.sc-message--meta {
  font-size: xx-small;
  margin-top: 0.65rem !important;
  color: rgb(97, 108, 118) !important;
  position: absolute !important;
  text-align: center;
}

.sc-message--content.sent .sc-message--text .sc-message--meta {
    right: 0;
}

.sc-message--file-name, .sc-message--text-content {
    min-width: 0;
    margin-top: 0;
    margin-bottom: 0rem !important;
    max-width: none;
    width: auto;
    min-height: 0;
    max-height: none;
    height: auto;
    margin: 0;
    padding: 0;
    color: inherit;
    background-color: transparent;
    background-image: none;
    border: 0 none transparent;
    border-radius: 0;
    overflow: visible;
    font-size: 100%;
    font-style: normal;
    font-weight: 400;
    line-height: inherit;
    text-decoration: none;
    text-align: left;
    text-shadow: none;
    text-transform: none;
}

.sc-message--text {   
  border-radius: 6px;
  padding-top: .5rem;
    padding-bottom: .5rem;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  -webkit-font-smoothing: subpixel-antialiased;
  .sc-message--text-body {
    .sc-message--text-content {
      white-space: pre-wrap;
    }
  }
  &:hover .sc-message--toolbox {
    left: -20px;
    opacity: 1;
  }
  &.confirm-delete:hover .sc-message--toolbox {
    left: -90px;
  }
  &.confirm-delete .sc-message--toolbox {
    width: auto;
  }
  .sc-message--toolbox {
    transition: left 0.2s ease-out 0s;
    white-space: normal;
    opacity: 0;
    position: absolute;
    left: 0px;
    width: 25px;
    top: 0;
    button {
      background: none;
      border: none;
      padding: 0px;
      margin: 0px;
      outline: none;
      width: 100%;
      text-align: center;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
  }
}

.sc-message--text code {
  font-family: 'Courier New', Courier, monospace !important;
}


.sc-message--content.received .sc-message--text {
  color: #263238;
  background-color: #e2e8f0;
  margin-right: 40px;
  border-top-left-radius: 0;
}

.sc-message .sc-message--content.received{
  padding-left:10px
}

.sc-message--content .received{
      margin-bottom: 20px;
      max-width: 80%;
      display: flex;
      min-width: 500px;
      padding-left:3px;
    }

.tooltip {
  display: block !important;
  z-index: 10000;
  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }
  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }
  &[x-placement^='top'] {
    margin-bottom: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^='bottom'] {
    margin-top: 5px;
    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^='right'] {
    margin-left: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[x-placement^='left'] {
    margin-right: 5px;
    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }
  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
  &.info {
    $color: rgba(#004499, 0.9);
    .tooltip-inner {
      background: $color;
      color: white;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }
    .tooltip-arrow {
      border-color: $color;
    }
  }
  &.popover {
    $color: #f9f9f9;
    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }
    .popover-arrow {
      border-color: $color;
    }
  }
}

.hide{
  display: none;
}

.invalid-input {
  position: absolute;
  z-index: 1;
  background: #ffffff;
  color: #643045;
  font-weight: bold;
  padding: 3px 10px;
  font-size: 13px;
  border-radius: 4px;
  border: solid 1px red;
  line-height: normal;
  white-space: normal;
  word-wrap: normal;
  bottom: 4.8em;
}

.invalid-arrow,
.invalid-arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.invalid-arrow {
  visibility: hidden;
}

.invalid-arrow::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
  border-bottom: solid 1px red;
  border-right: solid 1px red;
}
</style>
