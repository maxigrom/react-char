// @flow
import BasicApi from './Basic/BasicApi';
import type { TBaseApiJson } from '../Types/Api/Jsons/TBaseApiJson';
import type { TApiChat } from '../Types/Api/TApiChat';

const API = new BasicApi();

export type TChatsJson = {
  chats: TApiChat[],
} & TBaseApiJson;

export type TChatJson = {
  chat: TApiChat,
} & TBaseApiJson;

class ChatsApi {
  static fetchAllChats = async (token: string) => API.getWithToken('/chats', token);

  static fetchMyChats = async (token: string) => API.getWithToken('/chats/my', token);

  static fetchChat = async (token: string, chatId: string) => API.getWithToken(`/chats/${chatId}`, token);

  static createChat = async (token: string, title: string) => API.postWithToken('/chats', token, { data: { title } });

  static joinChat = async (token: string, chatId: string) => API.getWithToken(`/chats/${chatId}/join`, token);

  static leaveChat = async (token: string, chatId: string) => API.getWithToken(`/chats/${chatId}/leave`, token);

  static deleteChat = async (token: string, chatId: string) => API.deleteWithToken(`/chats/${chatId}`, token);

  static sendMessage = async (token: string, chatId: string, messageText: string) => API.postWithToken(`/chats/${chatId}`, token, {
    data: {
      content: messageText,
      statusMessage: false,
    },
  });
}

export default ChatsApi;
