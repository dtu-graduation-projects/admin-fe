<template>
    <!-- Site footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="grid grid-cols-12 gap-6 mt-5 mb-5">
                <div class="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 about">
                    <h6>Về chúng tôi</h6>
                    <p class="text-justify">Xây dựng được chương trình giám sát sức khỏe hệ sinh thái thủy vực trong thành
                        phố
                        Đà Nẵng thông qua bộ công cụ giám sát tổng hợp, định kỳ và thể hiện trực quan trên nền web
                        online, giúp cho các cơ quan chức năng theo dõi và quyết định kịp thời, chính xác.</p>
                </div>

                <div class="col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3">
                    <h6>Khu vực sông hồ</h6>
                    <ul class="footer-links">
                        <li v-for="(item, index) in mapLake" :key="index"><a
                                href="http://scanfcode.com/category/c-language/">{{ item.name }}</a></li>
                    </ul>
                </div>

                <div class="col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3">
                    <h6>Danh mục tin tức</h6>
                    <ul class="footer-links">
                        <li v-for="(item, index) in listCate" :key="index"><a
                                href="http://scanfcode.com/category/c-language/">{{ item.name }}</a></li>
                    </ul>
                </div>
            </div>
            <hr>
        </div>
        <div class="container">
            <div class="row">
                <div class="md:col-span-8 sm:col-span-6 xs:col-span-12 text-center mt-4">
                    <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved by
                        <a href="https://techzen.vn">Techzen</a>.
                    </p>
                </div>

                <div class="md:col-span-4 sm:col-span-6 xs:col-span-12">
                    <ul class="social-icons">
                        <li><a class="facebook" href="#"><img alt="" class="" src="@/assets/images/facebook.png" /></a></li>
                        <li><a class="mail" href="#"><img alt="" class="" src="@/assets/images/mail.png" /></a></li>
                        <li><a class="youtube" href="#"><img alt="" class="" src="@/assets/images/youtube.png" /></a></li>
                        <li><a class="phone" href="#"><img alt="" class="" src="@/assets/images/tel.png" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
import NewsApi from '../api-services/NewsApi'
import LakeApi from '../api-services/LakeApi'
export default {
    data() {
        return {
            listCate: [],
            mapLake: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            const res = await NewsApi.getList()
            this.listCate = res.data
            const resLake = await LakeApi.getList()
            this.mapLake = resLake.data
        },
    }
};
</script>
<style scoped>
.site-footer .about {
    max-width: 400px;
}

.site-footer {
    background-color: #0A3045;
    padding: 45px 0 20px;
    font-size: 15px;
    line-height: 24px;
    color: #737373;
}

.site-footer hr {
    border-top-color: #bbb;
    opacity: 0.5
}

.site-footer hr.small {
    margin: 20px 0
}

.site-footer h6 {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    margin-top: 5px;
    letter-spacing: 2px
}

.site-footer a {
    color: #737373;
}

.site-footer a:hover {
    color: #fff;
    text-decoration: none;
}

.footer-links {
    padding-left: 0;
    list-style: none
}

.footer-links li {
    display: block
}

.footer-links a {
    color: #737373
}

.footer-links a:active,
.footer-links a:focus,
.footer-links a:hover {
    color: #fff;
    text-decoration: none;
}

.footer-links.inline li {
    display: inline-block
}

.site-footer .social-icons {
    text-align: right
}

.site-footer .social-icons a {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-left: 6px;
    margin-right: 0;
    border-radius: 100%;
    background-color: #33353d
}
.social-icons img{
    width: 40px;
    height: 40px;
}

.copyright-text {
    margin: 0
}

@media (max-width:991px) {
    .site-footer [class^=col-] {
        margin-bottom: 30px
    }
}

@media (max-width:767px) {
    .site-footer {
        padding-bottom: 0;
        padding-left: 20px;
        padding-right: 20px;
    }

    .site-footer .copyright-text,
    .site-footer .social-icons {
        text-align: center
    }
}

.social-icons {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none
}

.social-icons li {
    display: inline-block;
    margin-bottom: 4px
}

.social-icons li.title {
    margin-right: 15px;
    text-transform: uppercase;
    color: #96a2b2;
    font-weight: 700;
    font-size: 13px
}

.social-icons a {
    background-color: #0A3045;
    color: #818a91;
    font-size: 16px;
    display: inline-block;
    line-height: 44px;
    width: 44px;
    height: 44px;
    text-align: center;
    margin-right: 8px;
    border-radius: 100%;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear
}

.social-icons a:active,
.social-icons a:focus,
.social-icons a:hover {
    color: #fff;
    background-color: #0A3045
}

.social-icons.size-sm a {
    line-height: 34px;
    height: 34px;
    width: 34px;
    font-size: 14px
}

.social-icons a.facebook:hover {
    background-color: #0A3045
}

.social-icons a.twitter:hover {
    background-color: #0A3045
}

.social-icons a.linkedin:hover {
    background-color: #0A3045
}

.social-icons a.dribbble:hover {
    background-color: #0A3045
}

@media (max-width:767px) {
    .social-icons li.title {
        display: block;
        margin-right: 0;
        font-weight: 600
    }
}</style>