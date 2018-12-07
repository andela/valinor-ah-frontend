import path from 'path';

export default {
  status: 'success',
  userProfile: {
    id: 1,
    fullName: 'Johnny Does',
    email: 'jonny@example.com',
    avatarUrl: path.join(__dirname, 'public/images/avatar.jpg'),
    bio: 'Unwilling sportsmen he in questions september therefore described so. Attacks may set few believe moments was. Reasonably how possession shy way introduced age inquietude. Missed he engage no exeter of. Still tried means we aware order among on. Eldest father can design tastes did joy settle.',
    confirmEmail: true,
    twitterUrl: null,
    facebookUrl: null,
    location: 'Lagos',
    followers: 4,
    following: 7,
    createdAt: '2018-2-29T07:38:16.490Z',
    roleId: 3,
    articles: [
      {
        id: 1,
        title: 'Change To Proprietary Display Driver Ubuntu 18.04',
        description: 'I recently upgraded to 18.04 from 16.04. My machine has NVIDIA Graphics ',
        body: 'I recently upgraded to 18.04 from 16.04. My machine has NVIDIA Graphics cards Quadro 410 When i tried to change graphics driver using the GUI mode under Software and updates. The default X.Org X server keeps on getting selected and I do not get any error.',
        articleImage: '',
        rating: 4,

      },
      {
        id: 2,
        title: 'Is There Such a Thing as ‘Naturally Creative\'?',
        description: 'While we often think of creativity as an event or as a natural skill ',
        body: 'While we often think of creativity as an event or as a natural skill that some people have and some don\'t, research  actually suggests that both creativity and non-creativity are learned.',
        rating: 3
      },
      {
        id: 2,
        title: 'My 2017 Annual Review',
        description: 'I finished the first draft of the manuscript in November, and we\'re working on edits',
        body: 'I finished the first draft of the manuscript in November, and we\'re working on edits now. There are still many improvements to make and, truthfully, a few months of work left, but it feels really good to see literally years of work all coming together.',
        rating: 2
      }
    ]
  }
};
