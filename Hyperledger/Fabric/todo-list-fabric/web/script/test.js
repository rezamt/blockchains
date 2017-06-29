class Test {

  constructor() {
    this.chaincode = document.querySelector( '#chaincode' ).value.trim();
    this.repository = document.querySelector( '#repository' ).value.trim();
    this.user = document.querySelector( '#user' ).value.trim();

    this.xhr = new XMLHttpRequest();
    this.xhr.addEventListener( 'load', evt => this.doResponse( evt ) );          

    let buttons = document.querySelectorAll( 'button' );

    for( let b = 0; b < buttons.length; b++ ) {
      buttons[b].addEventListener( 'click', evt => this.doRequest( evt ) );
    } 
  }

  doRequest( evt ) {
    // Gather parts
    let method = evt.target.parentElement.querySelector( '.method' ).value.trim();
    let operation = evt.target.parentElement.querySelector( '.function' ).value.trim();
    let values = evt.target.parentElement.querySelectorAll( '.argument' );

    // Default invoke or query
    let id = {
      name: this.chaincode
    };

    // Deploy
    if( method == 'deploy' ) {
      id = {
        path: this.repository
      };
    }

    // Build message
    let message = {
      jsonrpc: '2.0',
      method: method,
      params: {
        chaincodeID: id,
        ctorMsg: {
          function: operation,
          args: []
        },
        secureContext: this.user,
        type: 1
      },
      id: 1        
    }; 

    // Populate arguments
    for( let v = 0; v < values.length; v++ ) {
      message.params.ctorMsg.args.push( values[v].value.trim() );
    }

    // Confirm content
    console.log( message );

    // Make request
    this.xhr.open( 'POST', Test.URL, true );
    this.xhr.setRequestHeader( 'Content-Type', 'application/json' );
    this.xhr.send( JSON.stringify( message ) ); 
  }

  doResponse( evt ) {
    let data = JSON.parse( this.xhr.responseText );
    
    // Raw result
    console.log( data );

    if( data.hasOwnProperty( 'result' ) ) {
      try {
        // Query or invoke result
        let message = JSON.parse( data.result.message );  
        console.log( JSON.parse( data.result.message ) );        
      } catch( e ) {
        // Deployment result
        document.querySelector( '#chaincode' ).value = data.result.message;
        console.log( data.result.message );
      }
    } else if( data.hasOwnProperty( 'error' ) ) {
      // Error
      // Like no match in a query
      console.log( data.error.data );
    }
  }

}

// Endpoint for OpenWhisk action
// Test.WHISK = 'https://openwhisk.ng.bluemix.net';

// Direct to IBM Blockchain
// CORS-enabled
Test.URL = 'https://10e0bcbdab3c4c1d8890fb6201ea0832-vp0.us.blockchain.ibm.com:5003/chaincode';

let app = new Test();
