import React, { Component } from 'react';
import axios from 'axios';
import {Link,browserHistory} from 'react-router';
import '../static/css/reg.css';

class Reg extends Component {
	constructor(props){
		super(props)
		this.state={
			num:"获取验证码",
			disabled:"",
			flag:false
		}
		this.getPhone= this.getPhone.bind(this);
		this.nextstep = this.nextstep.bind(this);
        this.back = this.back.bind(this)
        this.blur = this.blur.bind(this)
	}
    componentDidMount(){
	    document.getElementsByTagName("html")[0].style.fontSize="62.5%"
        console.log(document.getElementsByTagName("html"));
        if(document.getElementsByClassName("font625")[0]){
			document.getElementsByClassName("font625")[0].remove()
		}
    }
    blur(){
        var getphone = this.refs.getphone.value;
        if(/^1[34578]\d{9}$/.test(getphone)){
            document.getElementById("getprev").style.backgroundColor= "#2395ff";
        }

    }
    back(){
        browserHistory.goBack()
    }
	getPhone(){
		var oSelf = this;
		var count=60;
		var getphone = this.refs.getphone.value;
		console.log(getphone);
		var timer="";

		if(!(/^1[34578]\d{9}$/.test(getphone))){
			alert('请输入正确的手机号码')

		}else{

			var url = "http://127.0.0.1:8000/api/doReg1";
			axios.post(url, {
				getphone
			})
			.then(function (response) {
				var data =response.data.prevNum;
				var newdata = sessionStorage.setItem("prevn",data);	
				console.log(sessionStorage.getItem("prevn"))
				if(response.data.status==0){
					alert(response.data.msg);
					timer=""	
				}else{
					 timer = setInterval(function(){
					count--;
					oSelf.setState({
						num:count,
						disabled:"disabled"
					})
					if(count==0){
						clearInterval(timer);
							oSelf.setState({
								num:"重新获取",
								disabled:""
								
							})
							
							sessionStorage.removeItem("prevn")
							console.log(sessionStorage.getItem('prevn'))
                        // document.getElementById("getprev").style.backgroundColor= "rgb(221, 221, 221)";

					}

					},300)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		}
		
	}

	nextstep(){
		var num = sessionStorage.getItem('prevn');
		console.log(num)
		var numbers = this.refs.numbers.value;
		var getphone = this.refs.getphone.value;
		var oSelf = this;
		if(num!=numbers || num==null){
			oSelf.setState({
				flag:false
			})			
			alert('请输入正确的验证码')
		}else{
		    var path=`/user/reg2`
		    browserHistory.push(path)
			oSelf.setState({
					flag:true
			})
		}
	}

    render() {
		var selector=""
			// if(this.state.flag==true){
			// 	    selector=<Link to="/user/reg2"><button id="nextstep" onClick={this.nextstep}>下一步</button></Link>
				// }else{
				 	 selector=<button id="nextstep" onClick={this.nextstep}>下一步</button>
				// }
        return(
            <div className="phone-reg">
               <header>
			<a href="#" onClick={this.back}>
				<i className="iconfont">&#xe600;</i>
			</a>
			注册
			<a href="#">密码登录</a>
		</header>
		<section id="reg-main">
			<div className="phone">
				<input type="text" placeholder="手机号" ref="getphone" onBlur={this.blur}/><button id="getprev" onClick={this.getPhone} disabled={this.state.disabled}>{this.state.num}</button>
			</div>
			<div className="prevnum">
				<input type="text" placeholder="验证码" ref="numbers"/>
			</div>
			<div className="prompt">
				温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意<a href="#">《用户服务协议》</a>
			</div>
			{
			selector
			}
			
		</section>
		
		<section id="thirdlogin">
			<h5></h5>
			<div className="loginchannel">
				<ul>
					<li>
						<a href="#">
							<i className="iconfont">&#xe66d;</i>
							<p>微信</p>
						</a>	
					</li>
					<li>
						<a href="#">
							<i className="iconfont">&#xe67e;</i>
							<p>QQ</p>
						</a>	
					</li>
					<li>
						<a href="#">
							<i className="iconfont">&#xe668;</i>
							<p>微博</p>
						</a>	
					</li>
					<li>
						<a href="#">
							<i className="iconfont">&#xe601;</i>
							<p>淘宝</p>
						</a>	
					</li>
				</ul>
			</div>
		</section>
            </div>        
        )
    }
}

export default Reg;