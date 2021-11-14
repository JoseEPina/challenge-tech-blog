async function editFormHandler(event) {
   event.preventDefault();

   const title = document.querySelector('input[name="post-title"]').value.trim();
   const content = document.querySelector('#post-content').value;
   const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

   console.log('~ title', title);
   console.log('~ content', content);
   const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
         title,
         content,
      }),
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (response.ok) {
      console.log('returned Okay;');
      document.location.replace('/dashboard/');
   } else {
      console.log('returned Failed;');
      alert(response.statusText);
   }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
