<template>
  <div>
    <genie-chat 
      :profile-details="profile" 
      :api-key="apiKey" 
      :app-id="appId" 
      :base-url="baseUrl"
    />
  </div>
</template>
  
<script setup lang="ts">
// Vue Libraries
import { ref } from "vue";
import { profile } from "./models/Profile";
import { v4 as uuidv4 } from "uuid";

// Components & Models
const profile = ref<Profile>();
const apiKey = ref(uuidv4());
const appId = ref("GEN");
const baseUrl = ref("genie-uat.icelanddev.net/");


profile.value = {
  userName: "Phil Brown",
  profileUrl: "URL",
  avatarUrl: "URL",
  subjectId: uuidv4()
}

</script>
  
<style lang="scss">
// .sc-chat-window {
//   z-index: 95 !important;

//   @include media-breakpoint-up(md) {
//     width: 450px !important;
//     height: calc(100% - 265px) !important;
//     max-height: none !important;
//   }
// }

// .hide {
//   display: none;
// }

// .chat-header {
//   display: flex;
//   flex-direction: column;
//   flex: 1;
// }

// .sc-header-clear {
//   position: absolute;
//   right: 5%;
//   top: 25%;
// }

// .sc-header-clear:hover {
//   color: darken($color: white, $amount: 10);
//   cursor: pointer;
// }

// .sc-header-expand {
//   position: absolute;
//   right: 12%;
//   top: 25%;
// }

// .sc-header-expand:hover {
//   color: darken($color: white, $amount: 10);
//   cursor: pointer;
// }

// .sc-message--system {
//   opacity: 0.65 !important;
//   color: red !important;
// }

// .sc-message--edited {
//   opacity: 0.7;
//   word-wrap: normal;
//   font-size: xx-small;
//   text-align: center;
// }

// .sc-message--meta {
//   font-size: xx-small;
//   margin-top: 0.65rem !important;
//   color: rgb(97, 108, 118) !important;
//   position: absolute !important;
//   text-align: center;
// }

// .sc-typing-indicator {
//   background-color: white !important;
// }

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }

// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }

// .emoji {
//   font-size: 2em;
// }

// .sc-message {
//   margin-left: 0px 11px 0px !important;
//   width: 95% !important;
//   margin-bottom: 1rem !important;
//   padding-bottom: 0px !important;
//   flex-direction: column;
//   flex: 1 1 0;
//   display: flex;

// }

// .sc-image {
//   display: none !important
// }

// .sc-user-input--text[contenteditable]::before {
//   color: grey !important;
// }

// .sc-message--file {
//   background-color: #e2e8f0 !important;
//   margin-right: 0px !important;
// }

// .sc-message--file-name>a {
//   font-weight: 500;
//   line-height: 24px;
//   text-align: center;
//   border-radius: 4px;
//   padding: 12px 13px;
//   background: #d1dbfa;
//   color: #123bb6 !important;
//   text-decoration: none;
//   font-size: 13px;
//   cursor: pointer;
// }

// .sc-message--file-name>a::before {
//   font-family: 'FontAwesome';
//   content: "\f15c";
//   margin: 5px;
//   font-size: 18px;
// }

// .sc-message--file-name,
// .sc-message--file-text {
//   background-color: #e2e8f0 !important;
// }

// .sc-message--file-name {
//   margin-bottom: 2em;
// }

// .sc-message--file-name:hover {
//   text-decoration: underline;
// }

// .sc-message--avatar.has-tooltip.v-has-tooltip-open {
//   z-index: 100;
// }

// .sc-message--avatar {
//   align-self: flex-start !important;
//   min-height: 40px !important;
//   min-width: 40px !important;
//   display: none;
// }

// .sc-header {
//   display: flex;
//   -webkit-box-pack: justify;
//   justify-content: space-between;
//   -webkit-box-align: center;
//   align-items: center;
//   height: 48px;
//   font-size: 18px;
//   padding: 0px 8px 0px 18px;
//   color: rgb(31, 31, 31);
//   background: rgb(245, 247, 248);
//   transition: color 200ms ease 0s, background-color 200ms ease 0s;
// }

// // .sc-chat-window {
// //     width: auto;
// //     min-width: auto;
// //     max-width: 445px;
// //     top: 0px;
// //     right: 16px;
// //     bottom: 16px;
// //     height: 100% !important;
// //     max-height: 100% !important;
// //     position: fixed;
// //     display: flex;
// //     z-index: 10000;
// //     transition: height 0.2s ease 0s, max-width 0.2s ease 0s, min-width 0.2s ease 0s, bottom 0.2s ease 0s, right 0.2s ease 0s;
// // }

// .header-title {
//   font-size: 16px;
//   font-weight: 600;
// }

// .header-subtitle {
//   font-size: 0.875rem;
// }

// .sc-launcher {
//   z-index: 95 !important;
// }

// .sc-header--img {
//   border-radius: 50%;
//   align-self: center;
//   padding: 10px;
//   max-width: 100%;
//   height: 90px;
// }

// .sc-message--file {
//   border-top-left-radius: 0px !important;
// }

// .sc-message--text {
//   padding-top: 0.5rem !important;
//   padding-bottom: 0.5rem !important;
//   padding-inline-start: 1rem !important;
//   padding-inline-end: 1rem !important;
//   color: #000000 !important;
//   background-color: #E2E8F0 !important;
//   border-top-left-radius: 0px !important;
//   font-size: 14px !important;
//   word-break: break-word !important;
//   margin: 0px !important
// }

// .sc-message-list-full .sc-message--text,
// .sc-message-list-full .sc-message--file {
//   padding: 20px !important;
//   background: rgb(249, 249, 249) !important;
//   border-radius: 8px !important;
//   box-shadow: 0 2px 4px #00000024, 0 0 2px #0000001f !important;
//   outline: transparent solid 1px !important;
// }


// .sc-message--text-content,
// .sc-message--file-name {
//   min-width: 0px;
//   max-width: none;
//   width: auto;
//   min-height: 0px;
//   max-height: none;
//   height: auto;
//   margin: 0px;
//   padding: 0px;
//   color: inherit;
//   background-color: transparent;
//   background-image: none;
//   border: 0px none transparent;
//   border-radius: 0px;
//   overflow: visible;
//   font-size: 100%;
//   font-style: normal;
//   font-weight: normal;
//   line-height: inherit;
//   text-decoration: none;
//   text-align: left;
//   text-shadow: none;
//   text-transform: initial;
// }

// .sc-message--content.sent .sc-message--text {
//   color: #fff !important;
//   background-color: #3E63DD !important;
//   max-width: calc(100% - 120px);
//   word-wrap: break-word;
//   margin-left: auto !important;
// }

// .sc-message--content.sent .sc-message--text .sc-message--meta {
//   right: 0
// }

// .sc-message--content.sent .sc-message--text {
//   border-radius: 10px 10px 0px 10px !important;
// }



// .full-chat-window {
//   position: absolute !important;
//   top: 0px !important;
//   right: 10px !important;
//   bottom: 0px !important;
//   height: 100% !important;
//   max-height: none !important;
//   width: calc(100% - 270px) !important;
//   height: 100vh !important;
//   border-radius: 10px !important;
//   box-shadow: none !important;
//   background-color: #f8f8f8 !important;

//   .sc-message-list {
//     background-color: #f8f8f8 !important;
//   }

//   .sc-message {
//     padding-bottom: 10px !important;
//   }

//   .sc-message--text>.sc-message--file {
//     box-shadow: none !important;
//     padding: 0px !important;
//   }

//   .sc-message--file-text,
//   .sc-message--file-name {
//     background-color: rgb(249, 249, 249) !important;
//   }

//   .invalid-input {
//     bottom: 8em;
//   }

//   .sc-header {
//     background-color: #dee2e6 !important;
//     color: #000000 !important;
//     min-height: 0px !important;
//     box-shadow: none !important;
//   }

//   .sc-user-input {
//     border-radius: 8px;
//     box-shadow: 0 8px 16px #00000024, 0 0 2px #0000001f;
//     height: 100px;
//     width: 100%;
//     padding: 15px;
//     background: white;
//     transition: none !important;
//   }

//   .sc-user-input.active {
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1411764706), 0 0 2px rgba(0, 0, 0, 0.1215686275);
//   }

//   .sc-message--text {
//     font-size: 16px;
//     font-weight: 400;
//     line-height: 22px;
//     padding-top: 16px;
//     padding-bottom: 16px;
//     white-space: pre-line;
//   }

//   .sc-message--meta {
//     margin-top: 1.65rem !important;
//   }

//   .sc-user-input--text {
//     font-size: 14px;
//     font-weight: 400;
//     box-shadow: none;
//     margin: 0px;
//     padding: 6px 8px;
//     box-sizing: border-box;
//     border-radius: 0px;
//     border: none;
//     background: none transparent;
//     color: rgb(50, 49, 48);
//     width: 100%;
//     min-width: 0px;
//     text-overflow: ellipsis;
//     outline: 0px;
//     resize: none;
//     min-height: inherit;
//     line-height: 17px;
//     flex-grow: 1;
//     overflow: auto;
//   }

//   .sc-message--content .received {
//     margin-bottom: 20px;
//     max-width: 80%;
//     display: flex;
//     min-width: 500px;
//   }

//   .sc-suggestions-row {
//     background: rgb(247 247 247) !important;
//   }
// }</style>
  