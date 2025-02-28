window.addEventListener('load', () => {
    document.querySelectorAll('header *').forEach((el, i) => {
        el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('enviar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erro ao enviar');
        const result = await response.json();
        alert(result.message);
        if (result.message === 'Mensagem enviada!') e.target.reset();
    } catch (error) {
        alert('Erro ao enviar a mensagem.');
        console.error(error);
    }
});