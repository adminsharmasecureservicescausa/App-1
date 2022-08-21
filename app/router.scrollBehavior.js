export default function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  // If on special path, dont scroll to top
  if (isOnSpecialPath(to.path)) {
    return null
  }

  return { x: 0, y: 0 }
}

function isOnSpecialPath(path) {
  let isSpecialPage = false

  switch (path) {
    //

    // Content is appended, dont scroll
    case '/':
    case '/premium/saved-posts':
      isSpecialPage = true
      break

    default:
      isSpecialPage = false
      break
  }

  return isSpecialPage
}
