export default `<li class="node">
    <details open>
        <summary <% if (!it.children.length) { %>class="no-children"<% } %>>
            <span class="node-element node-name" title="<%=it.friendlyName || ''%>"><%=it.name%></span><% it.segments.forEach(function(segment) { %><%~ E.include('segment', segment) %><% }) %>
        </summary>
        <% if (it.children.length) { %>
            <ul class="children">
                <% it.children.forEach(function(node) { %>
                    <%~ E.include('node', node) %>
                <% }) %>
            </ul>
        <% } %>
    </details>
</li>`;