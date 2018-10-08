import type { TUser } from './Users.data';
import { UsersData } from './Users.data';

export type TChatMessage = {
  user: TUser,
  text: string,
  createdAt: number,
}

export const ChatMessagesData = [
  {
    user: UsersData[1],
    text: 'Передо мной лежит гора одежды, из которой мне предстоит создать несколько норм луков и определить что следует выкинуть, а что докупить',
    createdAt: 1538971324355,
  },

  {
    user: UsersData[1],
    text: 'сложна',
    createdAt: 1538971617548,
  },

  {
    user: UsersData[2],
    text: 'Стопе',
    createdAt: 1538971794191,
  },

  {
    user: UsersData[2],
    text: 'ЛУКИ?',
    createdAt: 1538972767868,
  },

  {
    user: UsersData[2],
    text: 'Это сложна',
    createdAt: 1538973535444,
  },

  {
    user: UsersData[1],
    text: 'ага',
    createdAt: 1538974171978,
  },

  {
    user: UsersData[2],
    text: 'У меня только набор футболок и одна пара джинс',
    createdAt: 1538975000163,
  },

  {
    user: UsersData[1],
    text: 'уже складывается парочка хороших',
    createdAt: 1538975058402,
  },

  {
    user: UsersData[1],
    text: 'только нужна пара огромных свитеров',
    createdAt: 1538975706592,
  },

  {
    user: UsersData[1],
    text: 'кажется кто-то скоро поедет в секонд',
    createdAt: 1538975762201,
  },

  {
    user: UsersData[1],
    text: 'И ВСЕ ДОЛЖНО БЫТЬ ЧЕРНОЕ',
    createdAt: 1538976405061,
  },

  {
    user: UsersData[1],
    text: 'ОБОЖАЮ ЧЕРНОЕ',
    createdAt: 1538977384689,
  },

  {
    user: UsersData[2],
    text: 'Meh',
    createdAt: 1538977734762,
  },

  {
    user: UsersData[2],
    text: 'Я уже ушёл от этого',
    createdAt: 1538978707433,
  },

  {
    user: UsersData[2],
    text: 'Мне нравится светлая одежда',
    createdAt: 1538979579521,
  },
  {
    user: UsersData[1],
    text: 'мне нравится черное потому что все со всем сочетается',
    createdAt: 1538980493579,
  },
  {
    user: UsersData[3],
    text: 'Тащемта если гулять по вечерам, а днём вжобывать, то норм',
    createdAt: 1538980888264,
  },
  {
    user: UsersData[3],
    text: 'Давай вечером словимся в тс',
    createdAt: 1538981057605,
  },
  {
    user: UsersData[2],
    text: 'Я нашел билеты на самолёт. 15000р прямой туда + обратно',
    createdAt: 1538981352583,
  },
  {
    user: UsersData[2],
    text: 'Багаж до 10кг и вроде как ручная кладь есть',
    createdAt: 1538982068346,
  },
  {
    user: UsersData[2],
    text: 'Осталось решить мне, на какое время ехать и сколько жить там',
    createdAt: 1538983000428,
  },
  {
    user: UsersData[2],
    text: 'Так то, я уже размахнулся на месяц, а там может ещё один или улечу уже',
    createdAt: 1538983204962,
  },
  {
    user: UsersData[2],
    text: 'Я купил самолёт прямой на 19 июня',
    createdAt: 1538983760274,
  },
  {
    user: UsersData[3],
    text: 'Я точно не смогу 19, у Даны др',
    createdAt: 1538984443446,
  },
  {
    user: UsersData[3],
    text: 'Видимо буду добираться отдельно как-то',
    createdAt: 1538985083509,
  },
  {
    user: UsersData[2],
    text: 'Хорошо!',
    createdAt: 1538985402925,
  },
];
