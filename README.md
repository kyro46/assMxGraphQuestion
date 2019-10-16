# assMxGraphQuestion
mxGraph-Questiontypeplugin for ILIAS 5.4

For ILIAS 5.2 to 5.3 see the [**Releases**](https://github.com/kyro46/assMxGraphQuestion/releases)

### Questiontype that allows the creation of EPC-diagrams via drag&drop editor ###

This plugin will add a questiontype, that allows creation of Event-driven process chain diagramms.

Examiners can create:
* Sample solution
* Initial graph for the examinee to extend

### Installation ###

* Customizing/global/plugins/Modules/TestQuestionPool/Questions
```bash
mkdir -p Customizing/global/plugins/Modules/TestQuestionPool/Questions  
cd Customizing/global/plugins/Modules/TestQuestionPool/Questions
git clone https://github.com/kyro46/assMxGraphQuestion.git
```  
and activate it in the ILIAS-Admin-GUI. Manual correction has to be enabled for this question type.

### Known Problems ###

* PDF-generation for the "Test Archive File" does not support Scalable Vector Graphics yet, so the solution is not shown.

### Credits ###
* Development by Christoph Jobst, University Leipzig, 2017
* The plugin utilises [mxgraph](https://github.com/jgraph/mxgraph)