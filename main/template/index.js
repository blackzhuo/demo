// template
function compile(template) {
    let evalExpr = /<%=(.+?)%>/g;
    let expr = /<%([\s\S]+?)%>/g;
    template = template.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`').replace(expr, '`); \n $1 \n  echo(`');
    template = 'echo(`' + template + '`);';
    let script = `(function parse(data){
      let output = "";

      function echo(html){
        output += html;
      }

      ${ template }

      return output;
    })`;
    return script;
}

function parse(template, data) {
    let func = eval(compile(template));
    return func(data);
}
let template = `
                <ul>
                  <% for(let i=0; i < data.supplies.length; i++) { %>
                    <li><%= data.supplies[i] %></li>
                  <% } %>
                </ul>
                `;
let info = document.getElementById('info');
let html = parse(template, {
    supplies: ["broom", "mop", "cleaner"]
});
info.innerHTML = html;
// filter
function SaferHTML(templateData) {
    let s = templateData[0];
    for (let i = 1; i < arguments.length; i++) {
        let arg = String(arguments[i]);
        // Escape special characters in the substitution.
        s += arg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        // Don't escape special characters in the template.
        s += templateData[i];
    }
    return s;
}
let sender = 'Lisa<script>alert(1)</script>';
let message = SaferHTML `<p>${sender} has sent you a message.</p>`;
let info1 = document.getElementById('info1');
info1.innerHTML = message;


// tag template
let myBooks = [{
  title: 'test',
  author: 'test'
}]
let libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;
function hashTemplate(literals, ...values){
  console.log(literals, values)
}