document.addEventListener('DOMContentLoaded', function () {
	const videoButton = document.getElementById('videoButton')
	const videoCloseButton = document.getElementById('videoCloseButton')
	const videoContainer = document.getElementById('videoContainer')
	const videoWrapper = document.getElementById('videoWrapper')
	const headerBackground = document.getElementById('headerBackground')
	const headerOverlay = document.querySelector('.header__overlay')
	const headerContent = document.querySelector('.header__content')

	function init() {
		headerBackground.style.backgroundImage = "url('img/main.jpeg')"
		headerBackground.style.display = 'block'
		videoContainer.style.display = 'none'
		videoWrapper.innerHTML = ''
		headerOverlay.style.display = 'block'
		headerContent.style.display = 'flex'
	}

	function showVideo() {
		headerBackground.style.display = 'none'
		headerOverlay.style.display = 'none'
		headerContent.style.display = 'none'

		videoContainer.style.display = 'block'

		const videoId = '4ceca009814022155975efd7c21e273f'
		const iframe = document.createElement('iframe')
		iframe.src = `https://rutube.ru/play/embed/${videoId}?autoplay=true`
		iframe.setAttribute('frameborder', '0')
		iframe.setAttribute('allowfullscreen', 'true')
		iframe.setAttribute('allow', 'autoplay; fullscreen')
		iframe.style.width = '100%'
		iframe.style.height = '100%'
		iframe.style.position = 'absolute'
		iframe.style.top = '0'
		iframe.style.left = '0'
		iframe.style.zIndex = '5'

		videoWrapper.innerHTML = ''
		videoWrapper.appendChild(iframe)

		videoCloseButton.style.display = 'flex'
		videoCloseButton.style.zIndex = '10'
	}

	function hideVideo() {
		videoWrapper.innerHTML = ''
		videoContainer.style.display = 'none'
		headerBackground.style.display = 'block'
		headerOverlay.style.display = 'block'
		headerContent.style.display = 'flex'
	}

	videoButton.addEventListener('click', function (e) {
		e.preventDefault()
		showVideo()
	})

	videoCloseButton.addEventListener('click', function (e) {
		e.preventDefault()
		e.stopPropagation()
		hideVideo()
	})

	init()
})
