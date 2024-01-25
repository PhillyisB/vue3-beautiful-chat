<template>
  <div>
    <div      
      class="sc-launcher"
      :class="{opened: isOpen}"
      @click.prevent="isOpen ? close() : openAndFocus()"
    >
      <div v-if="newMessagesCount > 0 && !isOpen" class="sc-new-messsages-count">
        {{ newMessagesCount }}
      </div>
      <img v-if="isOpen" :src="CloseIcon" :alt="CloseIcon" class="sc-closed-icon" />
      <img v-else :src="OpenIcon" :alt="OpenIcon" class="sc-open-icon" />
    </div>
    <ChatWindow
      :message-list="messageList"
      :on-user-input-submit="sendMessage"
      :participants="participants"
      :is-open="isOpen"
      :show-header="true"
      :show-typing-indicator="showTypingIndicator"
      :always-scroll-to-bottom="true"
      @close="close"
      @scroll-to-top="$emit('scrollToTop')"
      @on-type="handleOnType"
      @keydown="handleKeyPress"
    />
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue"
import ChatWindow from "./ChatWindow.vue"
import CloseIcon from "./assets/close-icon.png"
import OpenIcon from "./assets/logo-no-bg.svg"
import { format } from "date-fns";
import { profile } from "./models/Profile";
import AskResponse from "./models/ChatRequest";

import messageHistoryTest from "../demo/src/messageHistory"

const props = defineProps<{ 
  apiKey: string,
  appId: string,
  profileDetails: profile,
}>()

const answers = ref<Array<[user: string, response: AskResponse]>>([]);
const isOpen = ref();
const newMessagesCount = ref();
const autoFocus = ref(true);
const invalidMessage = ref(true);
const showTypingIndicator = ref("");
const messageList = ref<Array<[type: string,id: string,author: string,data: {text: string}]>>([]); 
const citations = ref<string[] | undefined>([]);
const citationsPaths = ref<string[] | undefined>([]);
const participants = ref()

const $emit = defineEmits<{
    (e: "focusUserInput");
    (e: "scrollToTop");
  
  }>();

onMounted(() => {
  messageList.value = messageHistoryTest;
  if (localStorage.getItem(props.profileDetails?.subjectId as string)) {
    try {
      //JSON.parse(localStorage.getItem(props.profileDetails?.subjectId as string));
    } catch(e) {
      localStorage.removeItem(props.profileDetails?.subjectId as string);
    }
  }
  else{
    newMessagesCount.value = 1;
    //setMessagesStart();
  }

  const inputfield = document.getElementsByClassName("sc-suggestions-row")[0]
  const errorMessage = document.createElement("div");
  errorMessage.className = "invalid-input absolute hide";
  errorMessage.innerHTML = `
        <span>It appears that you've entered an invalid character. Please only use numbers and letters. For example, 'What's the current time?'</span>
        <div class="invalid-arrow"></div>
    `;
  
  inputfield.append(errorMessage)

});

function handleOnType (e: string) {
  if(e == "") {
    invalidMessage.value = true
  }

  invalidMessageHide();
  if (e !== "") {
    invalidMessage.value = /^[A-Za-z0-9?' ,-]+$/.test(e);
    if (invalidMessage.value) {      
      invalidMessageHide();  
    } else {
      invalidMessageShow();
    }
  }
}

function invalidMessageHide (){
  document.getElementsByClassName("invalid-input")[0].classList.add("hide");  
  document.getElementsByClassName("sc-user-input--button-icon-wrapper")[0].removeAttribute("disabled")   
}

function invalidMessageShow (){
  document.getElementsByClassName("invalid-input")[0].classList.remove("hide");  
  document.getElementsByClassName("sc-user-input--button-icon-wrapper")[0].setAttribute("disabled", "true")    
}

function handleKeyPress (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
}


function setMessagesStart (){
  messageList.value.push(
    {  
      type: "file",
      id: 0,
      author: "genie",
      data: {
        file:{
          name:"Iceland Foods Limited Virtual Assistant Disclaimer.pdf",
          url: "/Iceland_Foods_Limited_Virtual_Assistant_Disclaimer.pdf"
        },
        text: "We kindly request that you carefully read and familiarise yourself with our Virtual Assistant usage Disclaimer and Terms of Service, which can be found above.",
      }
    },
    {
      type: "text",
      id: 1,
      author: "genie",
      data: {
        text: "Hi " + props.profileDetails.userName.split(" ",1) + ". How can I help?"
      },
    },
  );
}

function sendMessage (question) {
  if(invalidMessage.value){
    const sanitizedValue = question.data.text.replace(/[^A-Za-z0-9?' ,-]/g, "");
    if(sanitizedValue.trim() !== "")
    {
      invalidMessage.value = false;
      showTypingIndicator.value = "true";

      citations.value = [];
      citationsPaths.value = [];

      const unknownMessage = {
        author: "me",
        type: "text",
        id: Math.random(),
        data: {
          meta:format(new Date(), "p"),
          text: sanitizedValue,
        },
      };

      messageList.value.push(unknownMessage)
      // storeChatSession();
      // makeApiRequest(question);
      
    }
    else{
      invalidMessage.value = true
    }
  }
  else{
    console.log("Invalid")
    invalidMessageHide()
    const unknownMessage = {
      author: "genie",
      type: "system",
      id: Math.random(),
      data: {
        text: "Message not sent. It appears that you've entered an invalid character. Please only use numbers and letters. For example, 'What's the current time?'"
      },
    };

    answers.value = [];
    messageList.value.push(unknownMessage);
    showTypingIndicator.value = "";
  }  
}

function openAndFocus (){
  isOpen.value = true
  newMessagesCount.value = 0
  if (autoFocus.value) {
    $emit("focusUserInput")
  }
}

const close = () => {
  isOpen.value = false;
};
</script>

<!-- <script>
import store from './store/'
import ChatWindow from './ChatWindow.vue'

import CloseIcon from './assets/close-icon.png'
import OpenIcon from './assets/logo-no-bg.svg'


export default {
  components: {
    ChatWindow
  },
  props: {
    icons: {
      type: Object,
      default: function () {
        return {
          open: {
            img: OpenIcon,
            name: 'default'
          },
          close: {
            img: CloseIcon,
            name: 'default'
          }
        }
      }
    },
    showEmoji: {
      type: Boolean,
      default: false
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    showEmojiInText: {
      type: Boolean,
      default: false
    },
    showEdition: {
      type: Boolean,
      default: false
    },
    showDeletion: {
      type: Boolean,
      default: false
    },
    showConfirmationDeletion: {
      type: Boolean,
      default: false
    },
    confirmationDeletionMessage: {
      type: String,
      default: 'Do you really want to delete the message?'
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    open: {
      type: Function,
      required: true
    },
    close: {
      type: Function,
      required: true
    },
    showFile: {
      type: Boolean,
      default: false
    },
    showLauncher: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    participants: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: () => ''
    },
    onMessageWasSent: {
      type: Function,
      required: true
    },
    messageList: {
      type: Array,
      default: () => []
    },
    newMessagesCount: {
      type: Number,
      default: () => 0
    },
    placeholder: {
      type: String,
      default: 'Write a message...'
    },
    showTypingIndicator: {
      type: String,
      default: () => ''
    },
    colors: {
      type: Object,
      validator: (c) =>
        'header' in c &&
        'bg' in c.header &&
        'text' in c.header &&
        'launcher' in c &&
        'bg' in c.launcher &&
        'messageList' in c &&
        'bg' in c.messageList &&
        'sentMessage' in c &&
        'bg' in c.sentMessage &&
        'text' in c.sentMessage &&
        'receivedMessage' in c &&
        'bg' in c.receivedMessage &&
        'text' in c.receivedMessage &&
        'userInput' in c &&
        'bg' in c.userInput &&
        'text' in c.userInput,
      default: function () {
        return {
          header: {
          bg: "#1e293b",
          text: "#ffffff",
        },
        launcher: {
          bg: "#1e293b",
        },
        messageList: {
          bg: "#ffffff",
        },
        sentMessage: {
          bg: "#3E63DD",
          text: "#ffffff",
        },
        receivedMessage: {
          bg: "#e2e8f0",
          text: "#222222",
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867",
        },
        }
      }
    },
    alwaysScrollToBottom: {
      type: Boolean,
      default: () => false
    },
    messageStyling: {
      type: Boolean,
      default: () => false
    },
    disableUserListToggle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    chatWindowTitle() {
      return this.title
    }
  },
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler(props) {
        for (const prop in props) {
          store.setState(prop, props[prop])
        }
      }
    }
  },
  methods: {
    openAndFocus() {
      this.open()
      if (this.autoFocus) {
        this.$event.$emit('focusUserInput')
      }
    }
  }
}
</script> -->

<style lang="scss" scoped>
.sc-chat-window {
   z-index: 95;

   @include media-breakpoint-up(md) {
     width: 450px;
     height: calc(189% - 100vh);
     max-height: none;
   }
 }

.hide{
  display: none;
}

.sc-launcher {
  background-color: #1e293b;
  width: 60px;
  height: 60px;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  right: 25px;
  bottom: 25px;
  border-radius: 50%;
  box-shadow: none;
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
}

.sc-launcher:before {
  content: '';
  position: relative;
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: box-shadow 0.2s ease-in-out;
}

.sc-launcher .sc-open-icon,
.sc-launcher .sc-closed-icon {
  width: 60px;
  height: 60px;
  position: fixed;
  right: 25px;
  bottom: 25px;
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
}

.sc-launcher .sc-closed-icon {
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
  width: 60px;
  height: 60px;
}

.sc-launcher .sc-open-icon {
  padding: 20px;
  box-sizing: border-box;
  opacity: 1;
}

.sc-launcher.opened .sc-open-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened .sc-closed-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened:before {
  box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
}

.sc-launcher:hover {
  box-shadow: 0 0px 27px 1.5px rgba(0, 0, 0, 0.2);
}

.sc-new-messsages-count {
  position: absolute;
  top: -3px;
  left: 41px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  background: #ff4646;
  color: white;
  text-align: center;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
}

.full-chat-window{
    position: absolute !important;
    top: 0px !important;
    right: 10px !important;
    bottom: 0px !important;
    height: 100% !important; 
    max-height: none !important;
    width: calc(100% - 270px) !important;
    height: 100vh !important;
    border-radius: 10px !important;
    box-shadow: none !important;
    background-color: #f8f8f8 !important;
    .sc-message-list{
      background-color: #f8f8f8 !important;
      padding: 0px;
      border-bottom-width: thin;
    }

    .sc-message{
      padding-bottom: 10px !important;
    }

    .sc-message--text > .sc-message--file{
      box-shadow:  none !important;
      padding: 0px !important;
    }

    .sc-message--file-text, .sc-message--file-name{
      background-color: rgb(249, 249, 249) !important;
    }

    .invalid-input {
      bottom: 8em;
    }
    
    .sc-header{
      background-color: #dee2e6 !important;
      color: #000000 !important;
      min-height: 0px !important;
      box-shadow: none !important;
    }

    .sc-user-input{
      border-radius: 8px;
        box-shadow: 0 8px 16px #00000024, 0 0 2px #0000001f;
        height: 100px;
        width: 100%;
        padding: 15px;
        background: white;
        transition: none !important;
    }

    .sc-user-input.active {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1411764706), 0 0 2px rgba(0, 0, 0, 0.1215686275);
    }

    .sc-message--text{
      font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    padding-top: 16px;
    padding-bottom: 16px;
    white-space: pre-line;
    }
    .sc-message--meta{
      margin-top: 1.65rem !important;
    }

    .sc-user-input--text{
    font-size: 14px;
    font-weight: 400;
    box-shadow: none;
    margin: 0px;
    padding: 6px 8px;
    box-sizing: border-box;
    border-radius: 0px;
    border: none;
    background: none transparent;
    color: rgb(50, 49, 48);
    width: 100%;
    min-width: 0px;
    text-overflow: ellipsis;
    outline: 0px;
    resize: none;
    min-height: inherit;
    line-height: 17px;
    flex-grow: 1;
    overflow: auto;
    }
    .sc-message--content .received{
      margin-bottom: 20px;
      max-width: 80%;
      display: flex;
      min-width: 500px;
    }
    .sc-suggestions-row{
      background: rgb(247 247 247) !important;
    }
}
</style>
