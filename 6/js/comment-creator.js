const commentCreator = (comments) => {
  const socialComments = document.querySelector('.social__comments');
  comments.forEach((({avatar, name, message}) => {
    const commentContainer = document.createElement('li');
    commentContainer.classList.add('social__comment');

    const avatarUsers = document.createElement('img');
    avatarUsers.classList.add('social__picture');
    avatarUsers.src = avatar;
    avatarUsers.alt = name;
    avatarUsers.width = '35';
    avatarUsers.height = '35';
    commentContainer.append(avatarUsers);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;
    commentContainer.append(commentText);

    socialComments.append(commentContainer);
  }));
};

export {commentCreator};
