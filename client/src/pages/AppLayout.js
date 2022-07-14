import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../components'

const AppLayout = () => {
    useEffect(() => {
        var chatbox = document.getElementById('fb-customer-chat');
        chatbox.setAttribute("page_id", "986756074748266");
        chatbox.setAttribute("attribution", "biz_inbox");

        // Your SDK code
        window.fbAsyncInit = function() {
            var FB;
            FB.init({
                xfbml            : true,
                version          : 'v14.0'
            });
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
    }, [])

    return (
        <div style={{ minHeight: '100vh'}}>
            <Header />
            <div>
                <Outlet />
                
                {/* Messenger Plugin chat Code */}
                <div id="fb-root"></div>

                {/* Your Plugin chat code */}
                <div id="fb-customer-chat" class="fb-customerchat">
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default AppLayout