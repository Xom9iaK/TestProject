document.addEventListener('DOMContentLoaded', function () {
	if (window.innerWidth > 767) return

	const slider = document.querySelector('.vertical-slider')
	const slides = document.querySelectorAll('.slider-item')
	const dots = document.querySelectorAll('.slider-dot')

	if (!slider || !slides.length || !dots.length) return

	function showSlide(index) {
		index = Math.max(0, Math.min(index, slides.length - 1))

		slides.forEach((slide, i) => {
			const isActive = i === index
			slide.classList.toggle('active', isActive)
			slide.classList.toggle('inactive', !isActive)
			slide.style.opacity = isActive ? '1' : '0.5'
		})

		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === index)
		})

		slider.scrollTo({
			left:
				slides[index].offsetLeft -
				(slider.offsetWidth - slides[index].offsetWidth) / 2,
			behavior: 'smooth',
		})
	}

	dots.forEach(dot => {
		dot.addEventListener('click', function () {
			const slideIndex = parseInt(this.getAttribute('data-slide-index'))
			showSlide(slideIndex)
		})
	})

	let touchStartX = 0
	let currentIndex = 0

	slider.addEventListener(
		'touchstart',
		e => {
			touchStartX = e.touches[0].clientX
		},
		{ passive: true }
	)

	slider.addEventListener(
		'touchend',
		e => {
			const touchEndX = e.changedTouches[0].clientX
			const diff = touchStartX - touchEndX
			const threshold = 50

			if (diff > threshold) {
				showSlide(currentIndex + 1)
				currentIndex = Math.min(currentIndex + 1, slides.length - 1)
			} else if (diff < -threshold) {
				showSlide(currentIndex - 1)
				currentIndex = Math.max(currentIndex - 1, 0)
			}
		},
		{ passive: true }
	)

	showSlide(0)
})
