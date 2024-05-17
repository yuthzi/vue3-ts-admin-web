/**
 *
 */
const resp = {
  success: true,
  code: 'success',
  message: 'Upload success.',
  data: {
    storename: 'ONW2dXEpZLTg84U.png',
    path: '/2024/05/15/ONW2dXEpZLTg84U.png',
    hash: 'HNl2SAt3uiK7FgzrIXEwJQOBv1',
    url: 'https://s2.loli.net/2024/05/15/ONW2dXEpZLTg84U.png',
  },
  RequestId: 'C872FD1D-5DD8-42A4-A75D-C51BFD110327',
}

const isSuccessJs = '.code=="success"'
const imgUrlJs = '.data.url'

const respField = 'resp'
if (eval(respField + isSuccessJs)) {
  const imgUrl = eval(respField + imgUrlJs)
  console.log('url=' + imgUrl)
}
