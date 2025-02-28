// Animação de entrada inicial (header)
window.addEventListener('load', function() {
    const headerElements = document.querySelectorAll('header *');
    headerElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
});

// Efeito pulsante no botão CTA fixo (opcional, se quiser adicionar)
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseover', () => {
        ctaButton.style.opacity = '0.9';
    });
    ctaButton.addEventListener('mouseout', () => {
        ctaButton.style.opacity = '1';
    });
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const assunto = document.querySelector('input[name="assunto"]').value;
    const mensagem = document.querySelector('textarea[name="mensagem"]').value;

    const data = {
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem
    };

    fetch('enviar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        console.log('Status da resposta:', response.status);
        console.log('Headers da resposta:', response.headers);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(text => {
        console.log('Resposta bruta:', text);
        try {
            const data = JSON.parse(text);
            alert(data.message);
            if (data.message === "Mensagem enviada!") {
                document.getElementById('contact-form').reset();
            }
        } catch (e) {
            throw new Error('Resposta não é JSON válido: ' + text);
        }
    })
    .catch(error => {
        alert('Erro ao enviar a mensagem. Veja o console pra mais detalhes.');
        console.error('Erro completo:', error);
    });
});