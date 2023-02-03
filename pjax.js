main.pjax = {};
main.pjax.container = '#body';
main.pjax.load = function(url,timeout){
	url = url||location.href;
	timeout = timeout||10000;
	$.pjax({
		url: url.replace(/\?.*/mg,''),
		fragment: main.pjax.container,
		container: main.pjax.container,
		timeout: timeout
	});
};
$(document).pjax('a[href]:not(a[target="_blank"], a[no-pjax]), a[use-pjax]', {
	container: main.pjax.container,
	fragment: main.pjax.container,
	timeout: 10000,
	cache: true,
	storage: true
})
.on('pjax:start',function(){
	if(!main.pjax.on){
		main.pjax.on = true;
		$('#main')
			.css('visibility','hidden')
			.css('opacity','0');
		NProgress.start();
	}
}).on('pjax:end',function(){
	NProgress.done();
	main.pjax.on = false;
	main.load();

window.TypechoComment = {
    dom : function (id) {
        return document.getElementById(id);
    },

    create : function (tag, attr) {
        var el = document.createElement(tag);

        for (var key in attr) {
            el.setAttribute(key, attr[key]);
        }

        return el;
    },

    reply : function (cid, coid) {
        var comment = this.dom(cid), parent = comment.parentNode,
            response = this.dom(respondId()), input = this.dom('comment-parent'),
            form = 'form' == response.tagName ? response : response.getElementsByTagName('form')[0],
            textarea = response.getElementsByTagName('textarea')[0];

        if (null == input) {
            input = this.create('input', {
                'type' : 'hidden',
                'name' : 'parent',
                'id'   : 'comment-parent'
            });

            form.appendChild(input);
        }

        input.setAttribute('value', coid);

        if (null == this.dom('comment-form-place-holder')) {
            var holder = this.create('div', {
                'id' : 'comment-form-place-holder'
            });

            response.parentNode.insertBefore(holder, response);
        }

        comment.appendChild(response);
        this.dom('cancel-comment-reply-link').style.display = '';

        if (null != textarea && 'text' == textarea.name) {
            textarea.focus();
        }

        return false;
    },

    cancelReply : function () {
        var response = this.dom(respondId()),
        holder = this.dom('comment-form-place-holder'), input = this.dom('comment-parent');

        if (null != input) {
            input.parentNode.removeChild(input);
        }

        if (null == holder) {
            return true;
        }

        this.dom('cancel-comment-reply-link').style.display = 'none';
        holder.parentNode.insertBefore(response, holder);
        return false;
    }
};

}).on('pjax:error', function (e, x, s, t, o) {
    const code = x.status;
    switch (code) {
        case 403:
        case 404:
            // https://github.com/defunkt/jquery-pjax/issues/627
            e.preventDefault();
            o.success(x.responseText, s, x);
            return false;
    }
});