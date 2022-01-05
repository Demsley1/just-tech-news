async function handleEditPost(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if(title){
        const response = await fetch (`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.reload('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', handleEditPost);