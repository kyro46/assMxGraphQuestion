<#1>
<?php
/**
 * Question plugin assMxGraphQuestion: database update script
 *
 * @author Christoph Jobst <cjobst@wifa.uni-leipzig.de>
 * @version $Id$
 */ 

$res = $ilDB->queryF("SELECT * FROM qpl_qst_type WHERE type_tag = %s", array('text'), array('assMxGraphQuestion')
);

if ($res->numRows() == 0) 
{
    $res = $ilDB->query("SELECT MAX(question_type_id) maxid FROM qpl_qst_type");
    $data = $ilDB->fetchAssoc($res);
    $max = $data["maxid"] + 1;

    $affectedRows = $ilDB->manipulateF(
		"INSERT INTO qpl_qst_type (question_type_id, type_tag, plugin) VALUES (%s, %s, %s)",
		array("integer", "text", "integer"),
		array($max, 'assMxGraphQuestion',
		1)
    );
}
?>
<#2>
<?php
	//Define data
	$fields = array(
			'question_fi'	=> array('type' => 'integer', 'length' => 4, 'notnull' => true ),
			'graphxml'      => array('type' => 'clob', 'notnull' => false ),
			'initialxml'    => array('type' => 'clob', 'notnull' => false ),
			'options'       => array('type' => 'text', 'length' => 200, 'fixed' => false, 'notnull' => false )
	);
	$ilDB->createTable("il_qpl_qst_mxgraph", $fields);
	$ilDB->addPrimaryKey("il_qpl_qst_mxgraph", array("question_fi"));	
?>
<#3>
<?php
	//Add HTML-Representation of the graph to table for presentation in PDF and for manual correction
    if(!$ilDB->tableColumnExists('il_qpl_qst_mxgraph', 'graphhtml'))
    {
        $ilDB->addTableColumn('il_qpl_qst_mxgraph', 'graphhtml', array(
                'type' => 'clob',
                'notnull' => false,
            )
        );
    }
    //Add HTML-Representation of the initial Graph to table for cases of an empty testee input
    if(!$ilDB->tableColumnExists('il_qpl_qst_mxgraph', 'initialhtml'))
    {
    	$ilDB->addTableColumn('il_qpl_qst_mxgraph', 'initialhtml', array(
    			'type' => 'clob',
    			'notnull' => false,
    		)
    	);
    }
    
?>