import React from 'react';

import './styles.css';
const List = function(props){
	return   <ul>{props.items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
}

const Vacancy = function(props){
	return   <input name="vacancy" type="text" value={props.vacancy} onChange={props.handleChange} />
}

const Portal = function(props){
	return (
		<select name="portal" value={props.portal} onChange={props.handleChange}>
			<option value="CV Library">CV Library</option>
			<option value="Total Jobs">Total Jobs</option>
		</select>
	)
}

const Branch = function(props){
	  return (
		<select name="branch" value={props.branch} onChange={props.handleChange}>
		  <option value="Bedford">Bedford</option>
		  <option value="Basingstoke">Basingstoke</option>
		  <option value="Faversham">Faversham</option>
		  <option value="Flixborough">Flixborough</option>
		  <option value="Liverpool">Liverpool</option>
		  <option value="Warminster">Warminster</option>
		  <option value="Witham">Witham</option>
		  <option value="Gosberton">Gosberton</option>
		  <option value="Huntly">Huntly</option>
		  <option value="Cumbernauld">Cumbernauld</option>
		</select>
	  );
}

const Person = function(props){
	  return (
		<select name="person" value={props.person} onChange={props.handleChange}>
		  <option value="Iza">Iza</option>
		  <option value="Lauren">Lauren</option>
		  <option value="Maria">Maria</option>
		  <option value="Amber">Amber</option>
		  <option value="Aliyah ">Aliyah </option>
		  <option value="Charlene">Charlene</option>
		</select>
	  );
}
const Check = function(props){
	message = 'Hi, its '+props.person+' from Dunster House Ltd and I have come across your CV on '+props.portal+'. I currently have a job vacancy for a '+props.vacancy+' that you may be interested in which is based at our '+props.branch+' Branch. I have also sent you an e-mail regarding this position so please check out your mail boxes. I have already called you from telephone number 01234 272445 and will attempt to call you again later on today,  alternatively you can return my call on 01234 272445 or e-mail email me at hr@dunsterhouse.co.uk I look forward to speaking to you. To find out more about us go to www.dunsterhouse.co.uk Kind Regards.(For and on behalf of Dunster House Ltd)';

	if(props.display == 'yes')
	{
		return (
				<div class="main-content">
					<span>This text message will be sent to above numbers:</span><br/><br/>
					<label>
					Hi, its {props.person} from Dunster House Ltd and I have come across your CV on {props.portal} I currently have a job vacancy for {props.vacancy} that you may be interested in which is based at our {props.branch} Branch. I have also sent you an e-mail regarding this position so please check out your mail boxes. I have already called you from telephone number 01234 272445 and will attempt to call you again later on today,  alternatively you can return my call on 01234 272445 or e-mail email me at hr@dunsterhouse.co.uk I look forward to speaking to you. To find out more about us go to www.dunsterhouse.co.uk Kind Regards.(For and on behalf of Dunster House Ltd)
					</label><br/><br/>
					<button onClick={props.onClick} >Confirm</button>
				</div>
		);
	}
	else
	return (
			<div>
			</div>
	);	
}
var phones = [];
var message = '';

class Phone extends React.Component {
	state = {term: '07', items: []};
	handleChange = (event) => {
		this.setState({term: event.target.value});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		if(this.state.term.length == 11){
			this.setState({
				term: '07',
				items: [...this.state.items,this.state.term]
			});
			phones = [...phones,this.state.term];
		}else
		alert('This mobile phone number is incorrect');
	}
	render(){
		return (
			<div>
				<p class="provide-mobile-p">Please provide mobile phone numbers below:</p>
				<form onSubmit={this.handleSubmit}>
					<input class="mobile-input" type="text" value={this.state.term} onChange={this.handleChange} />
					<button>Add</button>
				</form>
				<List items={this.state.items} />
			</div>
		);
	}
}


class Sms extends React.Component {
    constructor () {
      super();
      this.state = {
        vacancy: '', 
        person: 'Iza', 
        portal: 'CV Library',
        branch: 'Bedford',
        display: 'no'
      };
    }
      
      handleChange = (event) => {
          this.setState({[event.target.name]: event.target.value});
      }
  
      handleSubmit = (event) => {
          event.preventDefault();
          if(this.state.vacancy != '')
              this.setState({display: 'yes'});
          else	
              alert('Please fill in the vacancy.');
      }
      
      finalSubmit = (event) => {
          
          var numbers = JSON.stringify([...phones]), xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://dunsterhouse.co.uk/cron/sms/get_post.php');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onload = function() {
              if (xhr.status === 200 && xhr.responseText !== 'ok') {
                   alert('Something went wrong. ');
              }
              else if (xhr.status !== 200) {
                  alert('Request failed.  Returned status of ' + xhr.status);
              }
          };
          xhr.send(encodeURI('phones=' + numbers + '&message=' + message));	
          
          alert('Sent');
          
          //location.reload();
      }
  
      render(){
          return(
              <div class="main-content">
                  <label>				
                  Hi, its <Person person={this.state.person} handleChange={this.handleChange}  /> and I have come across your CV on <Portal portal={this.state.portal} handleChange={this.handleChange}  /> I currently have a job vacancy for <Vacancy vacancy={this.state.vacancy} handleChange={this.handleChange}  /> that you may be interested in which is based at our <Branch branch={this.state.branch} handleChange={this.handleChange} /> Branch. I have also sent you an e-mail regarding this position so please check out your mail boxes. I have already called you from telephone number 01234 272445 and will attempt to call you again later on today,  alternatively you can return my call on 01234 272445 or e-mail email me at hr@dunsterhouse.co.uk I look forward to speaking to you. To find out more about us go to www.dunsterhouse.co.uk Kind Regards.(For and on behalf of Dunster House Ltd)
                  </label>
                  <br />
                  <Phone />
                  <form onSubmit={this.handleSubmit}>
                      <button>Check</button>
                  </form>
                  <Check onClick={this.finalSubmit} display={this.state.display} person={this.state.person} portal={this.state.portal} vacancy={this.state.vacancy}  branch={this.state.branch}  />
              </div>
          )
      }
  }

export default Sms
