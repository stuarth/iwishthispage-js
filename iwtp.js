var iwtp = (function() {
    var extras = null;
    
    var post_req = function(url, params) {
        try {
            if (window.XMLHttpRequest) {
                var req = new XMLHttpRequest();
                req.open("POST", url, true);
            }
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            var params_string = "site_id=" + params["site_id"] + "&wish=" + encodeURI(params["wish"]) + "&url=" + encodeURI(params["url"]) + "&extras=" + JSON.stringify(extras);
            req.send(params_string);
        }
        catch (e) {
            console.error(e);
        }
    };
    var make_wish = function(site_id, wish) {
        post_req("https://iwishthispage.com/wish", {site_id: site_id, url: window.location.href, wish: wish});
    };

    var iwtp_init = function (site_id, target, prompts) {
        try {
            if (target != null) {
                while (target.firstChild) {
                    target.removeChild(target.firstChild);
                }
                var prompt = document.createElement("span");
                prompt.id = "prompt";
                prompt.innerText ="I wish this page";
                var input = document.createElement("input");
                input.type = "text";
                input.placeholder = prompts[Math.floor(Math.random() * prompts.length)];
                
                input.style = "margin-left: 3px; padding: 0 3px 1px 3px; border: 1px solid #ddd; width: 175px; height: 24px;";
                input.onkeypress = function(e) {
                    if (e.which == 13) {
                        var wish = input.value;
                        if (wish != "") {
                            make_wish(site_id, input.value);
                            prompt.innerText = "Thanks! We're on it!";
                            input.style = "display: none;";
                        }
                        
                        
                    }
                };
                target.appendChild(prompt);
                target.appendChild(input);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    return {
        init: iwtp_init,
        set_data: function(d) {
            extras = d;   
        }
    };
})();;
