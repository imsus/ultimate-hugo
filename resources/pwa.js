import runtime from 'offline-plugin/runtime'

runtime.install({
  onInstalled() {
    alert('Service worker is active. Content has been cached for offline use.')
    console.log(
      'Service worker is active. Content has been cached for offline use.'
    )
  },
  onUpdating() {
    alert('New Updates Detected. Downloading Updates.')
    console.log('Updating new Service Worker')
  },
  onUpdateReady() {
    alert('Download Finished. Installing New Update.')
    console.log('A new Content is available to update')
    runtime.applyUpdate()
  },
  onUpdated() {
    alert('Installing Finished. Please Refresh to update the website.')
    console.log('New content is available; please refresh.')
  },
  onUpdateFailed(error) {
    console.error('Error during service worker registration:', error)
  }
})
