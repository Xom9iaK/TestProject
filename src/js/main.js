document.addEventListener('DOMContentLoaded', function () {
	const heartIcons = document.querySelectorAll('.product-card__icon--heart')
	heartIcons.forEach(icon => {
		icon.addEventListener('click', function () {
			this.classList.toggle('active')
		})
	})


	
})

  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('orderModal');
    const orderButtons = document.querySelectorAll('.product-card__button');
    const closeBtn = document.querySelector('.modal-close');
    const orderForm = document.getElementById('orderForm');
    
    orderButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productCard = this.closest('.product-card');
        const productTitle = productCard.querySelector('.product-card__title').textContent;
        const productPrice = productCard.querySelector('.product-card__price').textContent;
        
        orderForm.dataset.product = productTitle;
        orderForm.dataset.price = productPrice;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
      });
    });
    
    closeBtn.addEventListener('click', function() {
      closeModal();
    });
    
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = ''; 
    }
    
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('userName').value;
      const phone = document.getElementById('userPhone').value;
      const agreement = document.getElementById('userAgreement').checked;
      
      if (!name || !phone || !agreement) {
        alert('Пожалуйста, заполните все поля и подтвердите согласие');
        return;
      }
      
      const product = orderForm.dataset.product;
      const price = orderForm.dataset.price;
      
      console.log('Отправка заявки:', {
        product: product,
        price: price,
        name: name,
        phone: phone
      });
      
      alert(`Спасибо, ${name}! Ваша заявка на товар "${product}" успешно отправлена.`);
      
      orderForm.reset();
      closeModal();
    });
    
    const phoneInput = document.getElementById('userPhone');
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0) {
        if (value[0] === '7' || value[0] === '8') {
          value = '+7' + value.substring(1);
        } else {
          value = '+7' + value;
        }
      }
      
      if (value.length > 2) {
        value = value.substring(0, 2) + ' (' + value.substring(2);
      }
      if (value.length > 7) {
        value = value.substring(0, 7) + ') ' + value.substring(7);
      }
      if (value.length > 12) {
        value = value.substring(0, 12) + '-' + value.substring(12);
      }
      if (value.length > 15) {
        value = value.substring(0, 15) + '-' + value.substring(15, 17);
      }
      
      e.target.value = value.substring(0, 18);
    });
  });
