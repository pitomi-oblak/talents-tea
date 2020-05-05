<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_book
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
jimport('joomla.application.component.controlleradmin');
/**
 * Component Controller
 *
 * @package     Joomla.Administrator
 * @subpackage  com_book
 */
class Blue_pagebuilderControllerPage extends JControllerAdmin
{
	public function __construct($config = array())
	{
		parent::__construct($config);
	}

	public function getModel($name = 'Client', $prefix = 'Blue_pagebuilderModel', $config = array('ignore_request' => true))
	{
		$model = parent::getModel($name, $prefix, $config);
		return $model;
	}

	public function contact(){
		$app 		= JFactory::getApplication();
	 	$mailfrom	= $app->getCfg('mailfrom');
		$fromname	= $app->getCfg('fromname');
		$stateggcaptcha = JRequest::getVar("bt_check_gg");		
		$captchasecret = JRequest::getVar("captchasecret");
        if($stateggcaptcha && $captchasecret){
		   $captcha = true;
		}
		else
		    $captcha = false;
		$emailauthor = JRequest::getVar("emailauthor");		

		// Get Input
		$name = JRequest::getVar("name");		
		$email = JRequest::getVar("email");
		//$website = JRequest::getVar("website");
		$message = JRequest::getVar("message");
		$subject = JRequest::getVar("subject");
		$thankyou = JRequest::getVar("thanks");
		//$website = JRequest::getVar("website");
		$re_verify = JRequest::getVar("verify");
		if(trim($emailauthor)){
			$mailfrom = $emailauthor;
		}

		$prefix = JText::sprintf('This is an enquiry email via %s from:', JUri::base());
		$body = "{$prefix} \n\n";
		$body.="{$name} <{$email}> \n";
		//if($website!=""){
//			$body.="Website : {$website}";
//		}
		$body.="\r\n\r\n\r\n".stripslashes($message);

		if ($captcha) {

            $params = array();
            
            if (!empty($_POST) && isset($_POST['g-recaptcha-response'])) {
                $params['response'] = urlencode($_POST['g-recaptcha-response']);
            }
            $params['remoteip'] = $_SERVER['REMOTE_ADDR'];

            $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$captchasecret."&response=".$params['response']."&remoteip=".$_SERVER['REMOTE_ADDR']);
            $response = @json_decode($response, true);
            
            if ($response["success"] == false) {
            	$mes = $response["error-codes"];
                echo json_encode(array("check"=>0,"message"=>$mes));
                die();
   	        }
        }
		$mail = JFactory::getMailer();
		$mail->addRecipient($mailfrom);
		$mail->setSender(array($mailfrom, $fromname));
		$mail->setSubject($subject);
		$mail->setBody($body);
		$sent = $mail->Send();
		$mes = (string)$sent;
		
		if (!($sent instanceof Exception)){
			echo json_encode(array("check"=>1,"message"=>$thankyou));
		}else{
			echo json_encode(array("check"=>0,"message"=>$mes));
		}
		die();
	}
}
