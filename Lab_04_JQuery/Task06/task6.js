let page = 1;

function loadData(){
  $.get(`https://jsonplaceholder.typicode.com/posts?_limit=6&_page=${page}`, function(data){
    data.forEach(post=>{
      $("#dataList").append(`
        <div class="card">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `);
    });
  });
}

$(document).ready(function(){
  loadData();
  $("#loadMore").click(function(){
    page++;
    loadData();
  });
});
