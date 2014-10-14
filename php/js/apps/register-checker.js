define( ['apps/register-message', 'apps/register-checker-password'], function ( mess, password ) {
  function init () {
    var $user = $( '.user-name' );
//    var $email = $( '.email' );
    var $password = $( '.main-password' );
    var $password_agin = $( '.password-agin' );
    var $next = $( '.next-step' );
    var $form = $( '#fm1' );
    var $comp = $( '#CompName' );
    var $addr = $( '#CompAddr' );
    var $cityname = $( '#cityname' );
    var $telp = $( '#Tel' );

    $user.bind( 'focus', function () {
      if ( $( this ).attr( 'ischecked' ) == 'false' )
      {
        return false;
      }

      mess.prompt( this, 'prompt' );
    } );

    // user
    $user.bind( 'blur', function () {
      var _this = this;

      if ( $( this ).attr( 'ischecked' ) == 'false' )
      {
        return false;
      }

      if ( checkEmpty( this ) || this.value == '' )
      {
        mess.error( this, 'empty' );
        $( this ).addClass( 'error' );
        this.isSubmit = false;
      }
      else if ( /^\d/.test( this.value ) )
      {
    	  mess.error( this, 'userFormat' );
    	  this.isSubmit = false;
      }
      else
      {
        this.value = trimSpace( this );
        if(checkUserName( this )){
          $.get("chkregister.php?action=validateUsername&username="+this.value , function(result){
            if(result=="true"){
              mess.success( _this, 'success' );
              _this.isSubmit = true;
              $( _this ).removeClass( 'error' );
            }
            else if(result == "failed")
        	{
                mess.error( _this, 'mysqlTimeOutErr');
                _this.isSubmit = false;
        	}
            else{
              mess.error( _this, 'hasUser' );
              _this.isSubmit = false;
            }
          });
        }
        else
        {
          mess.error( this, 'userError' );
          this.isSubmit = false;
        }
      }
    } );

    //mail
//    $email.bind( 'blur', function () {
//      var _this = this;
//
//      if ( checkEmpty( this ) || this.value == '' )
//      {
//        mess.error( this, 'empty' );
//        $( this ).addClass( 'error' );
//        this.isSubmit = false;
//      }
//      else
//      {
//        this.value = trimSpace( this );
//        if( checkMailFormat( this ) )
//        {
//          $.get( "register?action=validateEmail&email=" + this.value , function( result ) {
//          if( result == "true" )
//          {
//            mess.success( _this, 'success' );
//            _this.isSubmit = true;
//            $( _this ).removeClass( 'error' );
//          }
//          else
//          {
//            mess.error( _this, 'hasEmail' );
//            _this.isSubmit = false;
//          }
//        });
//
//        }
//        else
//        {
//          mess.error( this, 'emailError' );
//          this.isSubmit = false;
//        }
//      }
//    } );

    // password
    $password.bind( 'focus', function () {
      mess.prompt( this, 'passwordStrength', 'pass-word-strength' );
      $password_agin.get( 0 ).tooltip && $password_agin.get( 0 ).tooltip.remove();
      checkPassword( this );
    } );

    $password.bind( 'keyup', function () {
      checkPassword( this );
    } );

    $password.bind( 'blur', function () {
      this.tooltip && this.tooltip.remove();
      if ( this.value == '' )
      {
        mess.error( this, 'empty' );
        $( this ).addClass( 'error' );
      }
      else if ( this.value.length < 6 )
      {
        mess.error( this, 'pwless' );
        $( this ).addClass( 'error' );
        this.isSubmit = false;
      }
      else if ( this.value.length > 20 )
      {
        $( this ).addClass( 'error' );
        this.isSubmit = false;
      }
      else
      {
        $( this ).removeClass( 'error' );
      }
    } );

    $password_agin.bind( 'blur', function () {
      var _this = this;
      checkPassWordTwice( this, $password, function () {
        $( _this ).removeClass( 'error' );
      }, function () {
        $( _this ).addClass( 'error' );
      } );
    } );
    
    /*
    $cityname.bind( 'focus', function () {
    	
      } );
    $cityname.bind( 'blur', function(){
    	if ( checkEmpty( this ) || this.value == '' )
        {
    		mess.error( this, 'empty' );
    		$( this ).addClass( 'error' );
    		this.isSubmit = false;
        }
        else
        {
        	mess.success( this, 'success' );
            this.isSubmit = true;
            $( this ).removeClass( 'error' );
        }
    });
    */
    $comp.bind( 'blur', function(){
    	if ( checkEmpty( this ) || this.value == '' )
        {
    		mess.error( this, 'empty' );
    		$( this ).addClass( 'error' );
    		this.isSubmit = false;
        }
        else
        {
        	mess.success( this, 'success' );
            this.isSubmit = true;
            $( this ).removeClass( 'error' );
        }
    });
    $addr.bind( 'blur', function(){
    	if ( checkEmpty( this ) || this.value == '' )
        {
			mess.error( this, 'empty' );
			$( this ).addClass( 'error' );
			this.isSubmit = false;
        }
        else
        {
        	mess.success( this, 'success' );
            this.isSubmit = true;
            $( this ).removeClass( 'error' );
        }
	    });
    $telp.bind( 'blur', function(){
    	if ( checkEmpty( this ) || this.value == '' )
        {
    		mess.error( this, 'empty' );
    		$( this ).addClass( 'error' );
    		this.isSubmit = false;
        }
        else if(!checktell(this.value))
        {
        	mess.error( this, 'telephone' );
            $( this ).addClass( 'error' );
            this.isSubmit = false;
        }
        else
    	{
        	mess.success( this, 'success' );
            this.isSubmit = true;
            $( this ).removeClass( 'error' );
    	}
	});

    $next.bind( 'click', function () {
    	$form.submit();
    } );

    $form.bind( 'submit', function () {
      var isSubmit = submit();
      if ( !isSubmit )
      {
        var $elems = $( this ).find( 'input' ).filter( 'input[type!=submit][type!=hidden]' );
        $elems.each( function ( i, item ) {
          if ( item.value == '' )
          {
            mess.error( item, 'empty' );
            $( item ).addClass( 'error' );
          }
        } );
      }

      return isSubmit;
    } );
  }

  function checkEmpty ( _this ) {
    var reg = /^\s+$/;
    return reg.test( _this.value );
  }

  function trimSpace ( _this ) {
    var reg = /^\s+|\s+$/g;

    _this.value = _this.value.replace( reg, '' );
    return _this.value;
  }

  function checkUserName ( _this ) {
    var reg = /^[a-zA-Z0-9_]{2,20}$/;
    return reg.test( _this.value );
  }
  
  function checktell(value)
  {
	  var reg = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
	  return reg.test(value);
  }

  function checkMailFormat ( _this ) {
    var reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    return reg.test( _this.value );
  }

  function checkPassWordLevel ( _this ) {
    // 如果有空格则删除
    if ( /\s+/g.test( _this.value ) )
    {
      _this.value = _this.value.replace( /\s+/g, '' );
    }

    var checked = password.checker( _this );
    var level = 0;
    var len = _this.value.length;
    var Length = {
      lowerLen: 6,
      ten: 10,
      fifteen: 15,
      maxLen: 20
    };

    if ( len == 0 )
    {
      level = 0;
      return level;
    }

    if ( len > Length.maxLen )
    {
      mess.error( _this, 'overPasswordMaxLength' );
      $( _this ).addClass( 'error' );
      _this.isSubmit = false;
      level = 3;
      return level;
    }
    else
    {
      $( _this ).removeClass( 'error' );
      mess.prompt( _this, 'passwordStrength', 'pass-word-strength' );
    }

    if ( len >= Length.lowerLen && len < Length.ten )
    {
      // 纯字母，纯字符大于等于6位且小于10位为低级
      if ( checked == 'number' || checked == 'letter' || checked == 'symbol' )
      {
        level = 1;
      }

      // 混排长度大于等于6位且小于10位为中级
      if ( checked == 'mix' )
      {
        level = 2;
      }
    }

    if ( len >= Length.ten && len <= Length.maxLen )
    {
      // 纯数字大于等于10位，小于等于20位为中级
      if ( checked == 'number' )
      {
        level = 2;
      }

      // 纯字母，纯字符, 大于等于10位且小于15位为中级
      if ( len >= Length.ten && len < Length.fifteen )
      {
        if ( checked == 'letter' || checked == 'symbol' )
        {
          level = 2;
        }
      }

      // 混排长度大于等于6位且小于10位为中级
      if ( len >= Length.lowerLen && len < Length.ten )
      {
        if ( checked == 'mix' )
        {
          level = 2;
        }
      }
    }

    // 混排大于等于10位且小于20位为高级
    if ( len >= Length.ten && len <= Length.maxLen )
    {
      if ( checked == 'mix' )
      {
        level = 3;
      }
    }

    // 纯字母，纯字符大于等于15位且小于20位为高级
    if ( len >= Length.fifteen && len <= Length.maxLen )
    {
      if ( checked == 'letter' || checked == 'symbol' )
      {
        level = 3;
      }
    }

    $( _this ).removeClass( 'error' );
    _this.isSubmit = true;

    return level;
  }

  function checkPassWordTwice ( _this, password, success, error ) {
    if ( _this.value != password.val() )
    {
      mess.error( _this, 'passwordError' );
      _this.isSubmit = false;
      password.get( 0 ).isSubmit = false;
      typeof error == 'function' && error();
    }
    else
    {
      if ( _this.tooltip )
      {
        _this.tooltip.remove();
      }
      _this.isSubmit = true;
      password.get( 0 ).isSubmit = true;
      typeof success == 'function' && success();

    }
  }

  function checkPassword ( _this ) {
    var level = checkPassWordLevel( _this );
    var tooltip = _this.tooltip;
    var $password_strength = tooltip.find( '.strength' ).find( 'span' );
    var $password_level = tooltip.find( '.level' );

    $password_level.html( State.passwordStrength[ level ] );

    $password_strength.removeClass();
    if ( level > 0 )
    {
      for ( var i = 0; i < level; i++ )
      {
        var span = $password_strength[ i ];
        $( span ).addClass( 'red' );
      }
    }
  }

  function submit () {
    var $arg = $( '#agree' );
    var $form = $( '#fm1' );
    var $elems = $form.find( 'input' );
    var isSubmit = false;
    
    $elems.each( function ( i, v ) {
      var item = $( v );
      
      if ( !item.hasClass( 'next-step' ) && item.attr( 'type' ) != 'hidden' )
      {
        if ( !v.isSubmit )
        {
          isSubmit = false;
          return false;
        }
        else
        {
          isSubmit = true;
        }
      }
    } );
        
    if ( $arg.length > 0 )
    {
      var arg = $arg.get( 0 );
            
      if ( !arg.checked )
      {
          var $m = $arg.parent();
          var $tip = $m.find( '#tooltip_arg' );
          
          $tip.show();
      }
      else
      {
    	  isSubmit = true;
      }
    }

    return isSubmit;
  }

  return {
    init: init
  };
} );
