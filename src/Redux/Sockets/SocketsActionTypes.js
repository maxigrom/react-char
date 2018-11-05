// @flow
import createRequestAction from '../createRequestAction';

export const SOCKETS_CONNECTION = createRequestAction('sockets/SOCKETS_CONNECTION');
export const SOCKETS_CONNECTION_MISSING = Symbol('sockets/SOCKETS_CONNECTION_MISSING');

export const MOUNT_CHAT = Symbol('sockets/MOUNT_CHAT');
export const UNMOUNT_CHAT = Symbol('sockets/UNMOUNT_CHAT');

export const SEND_MESSAGE = Symbol('sockets/SEND_MESSAGE');
export const RECIEVE_MESSAGE = Symbol('sockets/RECIEVE_MESSAGE');
export const RECIEVE_NEW_CHAT = Symbol('sockets/RECIEVE_NEW_CHAT');
export const RECIEVE_DELETED_CHAT = Symbol('sockets/RECIEVE_DELETED_CHAT');
