export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7542/2.0/'
    : 'https://neko-back.herokuapp.com/2.0/'

// export const recoveryURL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3000/'
//     : 'https://pikadorius.github.io/project_cards/'
