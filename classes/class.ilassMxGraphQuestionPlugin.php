<?php

include_once "./Modules/TestQuestionPool/classes/class.ilQuestionsPlugin.php";
	
/**
* Question plugin assMxGraphQuestion
*
* @author Christoph Jobst <cjobst@wifa.uni-leipzig.de>
* @version $Id$
* @ingroup ModulesTestQuestionPool
*/
class ilassMxGraphQuestionPlugin extends ilQuestionsPlugin
{
		final function getPluginName()
		{
			return "assMxGraphQuestion";
		}
		
		final function getQuestionType()
		{
			return "assMxGraphQuestion";
		}
		
		final function getQuestionTypeTranslation()
		{
			return $this->txt($this->getQuestionType());
		}
}
?>