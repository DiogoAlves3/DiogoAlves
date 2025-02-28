window.addEventListener('load', () => {
    document.querySelectorAll('header *').forEach((element, index) => {
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
});

document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('enviar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const result = await response.json();
        alert(result.message);
        if (result.message === "Mensagem enviada!") event.target.reset();
    } catch (error) {
        alert('Erro ao enviar a mensagem.');
        console.error('Erro:', error);
    }
});