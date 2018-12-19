export const body = 'Ronaldo, 23, has had a formidable year for his club, winning the Premier League and the Champions League, scoring 42 goals in the process. This trophy also completes a clean sweep of individual honours for the man from Madeira."It is an overwhelming moment for me, a very special moment," he said in his emotional acceptance speech at Zurich\'s Opera House last night after being presented the award by Pele. "I would like to say to my mother and my sister: you can set off the fireworks now". I want to thank my friends, my family and my team-mates. This is one of the most important moments in my life. I hope I can come back."';

const comment = 'Lets just say that the text is really long and we are on our way to talk about it but then in the background, "I cant lie, I feel like John Wick with the stick"';

export const articleSample = {
  id: 1,
  title: 'Ronaldo crowned world best',
  category: 'Sport',
  readTime: 120500,
  createdAt: '2018-12-09T22:23:56.691Z',
  imageUrl: 'https://images.unsplash.com/photo-1527871252447-4ce32da643c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80',
  author: {
    fullName: 'Habeeb Olawale',
    avatarUrl: 'https://res.cloudinary.com/vivavalinor/image/upload/v1541446448/nql15siqfajqpsrudk7b.jpg'
  },
  comments: [{
    id: 1,
    date: '12 November, 2018',
    body: comment,
    author: {
      fullName: 'Chris Akanmu',
      avatarUrl: 'https://res.cloudinary.com/vivavalinor/image/upload/v1541446448/nql15siqfajqpsrudk7b.jpg'
    }
  }, {
    id: 2,
    date: '13 November, 2018',
    body: comment,
    author: {
      fullName: 'Abiodun Abudu',
      avatarUrl: 'https://res.cloudinary.com/vivavalinor/image/upload/v1541446448/nql15siqfajqpsrudk7b.jpg'
    }
  }]
};

export const sampleReportTypes = [
  { id: 1, value: 'Plagiarism' },
  { id: 2, value: 'Hate Speech' },
  { id: 3, value: 'Rules Violation' }
];

export const sampleCategoryOptions = [
  { id: '1', categoryName: 'Football' },
  { id: '2', categoryName: 'Gaming' },
  { id: '3', categoryName: 'Programming' },
  { id: '4', categoryName: 'Andela' },
  { id: '5', categoryName: 'Bootcamp' },
  { id: '6', categoryName: 'Cohort-41' },
  { id: '7', categoryName: 'Learning' },
  { id: '8', categoryName: 'Gaming' },
  { id: '9', categoryName: 'Food' }
];

export const sampleTagOptions = [
  { id: '3', text: 'Andela' },
  { id: '4', text: 'Bootcamp' },
  { id: '5', text: 'Cohort-41' },
  { id: '6', text: 'Learning' },
  { id: '7', text: 'Gaming' },
  { id: '8', text: 'Food' },
  { id: '9', text: 'Andelino' },
  { id: '10', text: 'Andrela' },
  { id: '11', text: 'Andrebaa' },
];
