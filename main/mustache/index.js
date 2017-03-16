let view = {
    title: "Joe",
    calc: function () {
        return 2 + 4;
    },
    test: `<script>alert(2)</script>`,
    test1: `<script>alert(3)</script>`
};

let output = Mustache.render("{{title}} spends {{calc}} {{test}} {{{test1}}}", view);
document.getElementById('content').innerHTML = output;
document.getElementById('content1').innerHTML = view.test1;