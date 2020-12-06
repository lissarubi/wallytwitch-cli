#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
const fetch = require('node-fetch');

const channel = argv.channel;
const user = argv.user;
if (channel != null || user != null) {
  let url = `https://tmi.twitch.tv/group/user/${channel}/chatters`;

  let settings = { method: 'Get' };

  fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      const total = [].concat(
        json.chatters.vips,
        json.chatters.moderators,
        json.chatters.viewers,
      );

      const index = total.indexOf(user);

      if (index == -1) {
        console.log('\x1b[32m', `USER ${user} WASN'T FOUND!`);
      } else {
        console.log('\x1b[31m', `USER ${user} WAS FOUND!`);
      }
    });
}
