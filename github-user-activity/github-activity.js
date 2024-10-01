const https = require('node:https');

const input = process.argv;

function getEvents(user) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${user}/events`,
      method: 'GET',
      headers: {
        "User-Agent": user,
      },
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

function eventGateway(data) {
  const events = data.map(event => {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed ${event.payload.commits.length} commits to ${event.repo.name}`;
      case 'IssuesEvent':
        return `Opened a new issue in ${event.repo.name}`;
      case 'WatchEvent':
        return `Starred ${event.repo.name}`;
      case 'ForkEvent':
        return `${actor.login} forke in ${event.repo.name}`;
      case 'DeleteEvent':
        return `Delete in ${event.payload.ref_type} for ${event.repo.name}`;
      case 'CreateEvent':
        return `${event.payload.ref_type} created in ${event.repo.name}`;
      default:
        return `event: ${event.type}`;
    }
  });
  console.log(events);
}

if (input[2]) {
  getEvents(input[2]).then((data) => {
    eventGateway(data);
  }).catch(error => {
    console.error(error);
  })
} else {
  console.log('invalid username, example: node github-activity.js xxxdassy');
}
