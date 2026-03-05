import teamMembers from './data.js';

const memberToListItem = (member) =>
  `
    <li><a href="/team/${member.id}">${member.name}</a></li>
  `;

const teamList = document.getElementById('team-list');

const membersArray = Object.values(teamMembers);

teamList.innerHTML = membersArray.reduce(
  (acc, member) => acc + memberToListItem(member),
  ''
);
