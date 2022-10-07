export default `<ul class="tree">
<% it.root.children.forEach(function(node) { %><%~ E.include('node', node) %><% }) %>
</ul>`;