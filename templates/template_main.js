
		// Program starts here. The document.onLoad executes the
		// createEditor function with a given configuration.
		// In the config file, the mxEditor.onInit method is
		// overridden to invoke this global function as the
		// last step in the editor constructor.
		function onInit(editor)
		{
			// Enables rotation handle
			mxVertexHandler.prototype.rotationEnabled = true;

			// Enables guides
			mxGraphHandler.prototype.guidesEnabled = true;
			
		    // Alt disables guides
		    mxGuide.prototype.isEnabledForEvent = function(evt)
		    {
		    	return !mxEvent.isAltDown(evt);
		    };
			
			// Enables snapping waypoints to terminals
			mxEdgeHandler.prototype.snapToTerminals = true;
			
			// Defines an icon for creating new connections in the connection handler.
			// This will automatically disable the highlighting of the source vertex.
			mxConnectionHandler.prototype.connectImage = new mxImage('./Customizing/global/plugins/Modules/TestQuestionPool/Questions/assMxGraphQuestion/templates/mxgraph/images/connector.gif', 16, 16);
			
			// Enables connections in the graph and disables
			// reset of zoom and translate on root change
			// (ie. switch between XML and graphical mode).
			editor.graph.setConnectable(true);

			// Clones the source if new connection has no target
			editor.graph.connectionHandler.setCreateTarget(true);

			// Updates the title if the root changes
			var title = document.getElementById('title');
			
			if (title != null)
			{
				var f = function(sender)
				{
					title.innerHTML = 'mxDraw - ' + sender.getTitle();
				};
				
				editor.addListener(mxEvent.ROOT, f);
				f(editor);
			}
			
			var loadGraphXML = document.getElementById('graphXML').value;
			var loadXml = mxUtils.parseXml(loadGraphXML);
			var nodeXml = loadXml.documentElement;
			var dec = new mxCodec(nodeXml.ownerDocument);
			dec.decode(nodeXml, editor.graph.getModel());
						
		    // Changes the zoom on mouseWheel events
			//disabled because it blocks scrolling on the page
			/*
		    mxEvent.addMouseWheelListener(function (evt, up)
		    {
			    if (!mxEvent.isConsumed(evt))
			    {
			    	if (up)
					{
			    		editor.execute('zoomIn');
					}
					else
					{
						editor.execute('zoomOut');
					}
					
					mxEvent.consume(evt);
			    }
		    });
			*/
			// Defines a new action to switch between
			// XML and graphical display
			var textNode = document.getElementById('xml');
			var saveNode  = document.getElementById('graphXML');
			var initialNode = document.getElementById('initialXML');
			var graphNode = editor.graph.container;
			var sourceInput = document.getElementById('source');
			sourceInput.checked = false;
			var toggleInput = document.getElementById('toggleInput');
			toggleInput.checked = false;
			var graphHtmlNode = document.getElementById('graphHtml');
			var initialHtmlNode = document.getElementById('initialHtml');
			
			var funct = function(editor)
			{
				if (sourceInput.checked)
				{
					graphNode.style.display = 'none';
					textNode.style.display = 'inline';
					
					var enc = new mxCodec();
					var node = enc.encode(editor.graph.getModel());
					
					textNode.value = mxUtils.getPrettyXml(node);
					textNode.originalValue = textNode.value;
					textNode.focus();
					
					
					if (!toggleInput.checked)
					{
						saveNode.value = mxUtils.getPrettyXml(node);
						saveNode.originalValue = saveNode.value;
					} else {
						initialNode.value = mxUtils.getPrettyXml(node);
						initialNode.originalValue = initialNode.value;
					}
					
				}
				else
				{
					graphNode.style.display = '';
					
					if (textNode.value != textNode.originalValue)
					{
						var doc = mxUtils.parseXml(textNode.value);
						var dec = new mxCodec(doc);
						dec.decode(doc.documentElement, editor.graph.getModel());
					}

					textNode.originalValue = null;
					
					// Makes sure nothing is selected in IE
					if (mxClient.IS_IE)
					{
						mxUtils.clearSelection();
					}

					textNode.style.display = 'none';

					// Moves the focus back to the graph
					editor.graph.container.focus();
				}
			};
			
			var toggleInputFunct = function(editor)
			{
				//Initial mode checked
				if (toggleInput.checked)
				{
					var loadInitialXML = document.getElementById('initialXML').value;
					if (loadInitialXML == '\n' || loadInitialXML == '') { //TODO this might change with different input types
						loadInitialXML = '<mxGraphModel><root><Diagram label="New Diagram" id="0"><mxCell/></Diagram><Layer label="Default Layer" id="1"><mxCell parent="0"/></Layer></root></mxGraphModel>';
					}
					var loadXml = mxUtils.parseXml(loadInitialXML);
					var nodeXml = loadXml.documentElement;
					var dec = new mxCodec(nodeXml.ownerDocument);
					dec.decode(nodeXml, editor.graph.getModel());
				}
				else
				{
					var loadGraphXML = document.getElementById('graphXML').value;
					if (loadGraphXML == '\n' || loadGraphXML == '') { //TODO this might change with different input types
						loadGraphXML = '<mxGraphModel><root><Diagram label="New Diagram" id="0"><mxCell/></Diagram><Layer label="Default Layer" id="1"><mxCell parent="0"/></Layer></root></mxGraphModel>';
					}
					var loadXml = mxUtils.parseXml(loadGraphXML);
					var nodeXml = loadXml.documentElement;
					var dec = new mxCodec(nodeXml.ownerDocument);
					dec.decode(nodeXml, editor.graph.getModel());
					
				}
			};
			
			//make developers life much more easier
			editor.graph.setPanning(false);
			editor.graph.autoScroll=false;
			editor.graph.maximumGraphBounds = new mxRectangle(0, 0, 700, 500);
			
			var writeXmlToBox_funct = function(editor)
			{
					var enc = new mxCodec();
					var node = enc.encode(editor.graph.getModel());
					var xml = mxUtils.getXml(node);
				if (!toggleInput.checked){

					if (xml != '<mxGraphModel><root><Diagram label="New Diagram" id="0"><mxCell/></Diagram><Layer label="Default Layer" id="1"><mxCell parent="0"/></Layer></root></mxGraphModel>')
					{
						//saveNode.value = mxUtils.getPrettyXml(node);
						saveNode.value = xml;
						saveNode.originalValue = saveNode.value;

						/*
						//Set Size of SVG
						//Get desired max size
						var scale = editor.graph.view.scale;
						var bounds = editor.graph.getGraphBounds();
						var w = Math.ceil(bounds.width * scale + 2);
						var h = Math.ceil(bounds.height * scale + 2);
						var pageFormat = new mxRectangle(0, 0, w, h)

						// Computes the horizontal and vertical page count
						var bounds = editor.graph.getGraphBounds().clone();
						var currentScale = editor.graph.getView().getScale();
						var sc = currentScale / 1;//this.scale;
						var tr = editor.graph.getView().getTranslate();
						
						// Store the available page area
						var availableWidth = pageFormat.width;
						var availableHeight = pageFormat.height;

						// Compute the unscaled, untranslated bounds to find
						// the number of vertical and horizontal pages
						bounds.width /= sc;
						bounds.height /= sc;
						
						var dy = availableHeight / scale + (bounds.y - tr.y * currentScale) / currentScale;
						var dx = availableWidth / scale + (bounds.x - tr.x * currentScale) / currentScale;
				
						//End set Size of SVG
						*/
						
						graphHtmlNode.value = document.getElementById('graph').innerHTML;
						
						//var debugoutput = document.getElementById('graphdebug');
						//debugoutput.innerHTML = graphHtmlNode.value;

					} else 
					{
						saveNode.value = "";
						graphHtmlNode.value = "";
						//var debugoutput = document.getElementById('graphdebug');
						//debugoutput.innerHTML = "leer";
						saveNode.originalValue = saveNode.value;
					}
				} else {

					if (xml != '<mxGraphModel><root><Diagram label="New Diagram" id="0"><mxCell/></Diagram><Layer label="Default Layer" id="1"><mxCell parent="0"/></Layer></root></mxGraphModel>')
					{
						//saveNode.value = mxUtils.getPrettyXml(node);
						initialNode.value = xml;
						initialNode.originalValue = initialNode.value;
						
						initialHtmlNode.value = document.getElementById('graph').innerHTML;
						//var debugoutput = document.getElementById('graphdebug');
						//debugoutput.innerHTML = initialHtmlNode.value;
						
					} else 
					{
						initialNode.value = "";
						initialHtmlNode.value = "";
						//var debugoutput = document.getElementById('graphdebug');
						//debugoutput.innerHTML = "leer";
						initialNode.originalValue = initialNode.value;
					}	
				}

			};			

			editor.addAction('switchView', funct);
			editor.addAction('toggleInput', toggleInputFunct);
			editor.addAction('writeXmlToBox', writeXmlToBox_funct);

			// Defines a new action to switch between
			// XML and graphical display
			mxEvent.addListener(sourceInput, 'click', function()
			{
				editor.execute('switchView');
			});
			
			mxEvent.addListener(toggleInput, 'click', function()
			{
				editor.execute('toggleInput');
			});
			
			mxEvent.addListener(graphNode, 'mouseover', function()
			{
				editor.execute('writeXmlToBox');
			});
			
			mxEvent.addListener(graphNode, 'mouseout', function()
			{
				editor.execute('writeXmlToBox');
			});
		
			// Create select actions in page
			var node = document.getElementById('mainActions');
			//var buttons = ['group', 'ungroup', 'cut', 'copy', 'paste', 'delete', 'undo', 'redo', 'print', 'show'];
			//less buttons
			var buttons = ['group', 'ungroup', 'cut', 'copy', 'paste', 'delete', 'undo', 'redo'];
			
			// Only adds image and SVG export if backend is available
			// NOTE: The old image export in mxEditor is not used, the urlImage is used for the new export.
			if (editor.urlImage != null)
			{
				// Client-side code for image export
				var exportToSvg = function(editor)
				{
					var graph = editor.graph;
					var scale = graph.view.scale;
					var bounds = graph.getGraphBounds();
					
		        	// New image export
					var xmlDoc = mxUtils.createXmlDocument();
					var root = xmlDoc.createElement('output');
					xmlDoc.appendChild(root);
					
				    // Renders graph. Offset will be multiplied with state's scale when painting state.
					var xmlCanvas = new mxXmlCanvas2D(root);
					xmlCanvas.translate(Math.floor(1 / scale - bounds.x), Math.floor(1 / scale - bounds.y));
					xmlCanvas.scale(scale);
					
					var imgExport = new mxImageExport();
				    imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
				    
					// Puts request data together
					var w = Math.ceil(bounds.width * scale + 2);
					var h = Math.ceil(bounds.height * scale + 2);
					var xml = mxUtils.getXml(root);
					
					// Requests image if request is valid
					if (w > 0 && h > 0)
					{
						var name = 'export.png';
						var format = 'png';
						var bg = '&bg=#FFFFFF';
						
						new mxXmlRequest(editor.urlImage, 'filename=' + name + '&format=' + format +
		        			bg + '&w=' + w + '&h=' + h + '&xml=' + encodeURIComponent(xml)).
		        			simulate(document, '_blank');
						
					}
				};
				editor.addAction('exportToSvg', exportToSvg);
			};
			
			for (var i = 0; i < buttons.length; i++)
			{
				var button = document.createElement('button');
				button.setAttribute("class", "btn btn-default");
				button.setAttribute("type", "button");
				mxUtils.write(button, mxResources.get(buttons[i]));
			
				var factory = function(name)
				{
					return function()
					{
						editor.execute(name);
					};
				};
			
				mxEvent.addListener(button, 'click', factory(buttons[i]));
				node.appendChild(button);
			}

			// Create select actions in page
			var node = document.getElementById('selectActions');
			mxUtils.write(node, mxResources.get('select_main'));
			mxUtils.linkAction(node, mxResources.get('all'), editor, 'selectAll');
			mxUtils.write(node, ', ');
			mxUtils.linkAction(node, mxResources.get('none'), editor, 'selectNone');
			mxUtils.write(node, ', ');
			mxUtils.linkAction(node, mxResources.get('vertices'), editor, 'selectVertices');
			mxUtils.write(node, ', ');
			mxUtils.linkAction(node, mxResources.get('edges'), editor, 'selectEdges');

			// Create select actions in page
			var node = document.getElementById('zoomActions');
			mxUtils.write(node, 'Zoom: ');
			mxUtils.linkAction(node, 'In', editor, 'zoomIn');
			mxUtils.write(node, ', ');
			mxUtils.linkAction(node, 'Out', editor, 'zoomOut');
			mxUtils.write(node, ', ');
			mxUtils.linkAction(node, 'Actual', editor, 'actualSize');
			mxUtils.write(node, ', ');
			mxUtils.linkAction(node, 'Fit', editor, 'fit');
		}

		//window.onbeforeunload = function() { return mxResources.get('changesLost'); };
