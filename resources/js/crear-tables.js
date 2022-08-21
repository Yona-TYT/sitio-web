




function create_table(){

	//Descripcion de las celdas--------------------------------------
	var name_desc_cel = ["","","Precio del dolar","", "Margen de ganancia"];

	//----------------------------------------------------------------
	//Nombre de las celdas value--------------------------------------
	var name_cel = ["Nombre Producto | Cantidad", "Ganancia | Precio Entrada", "Precio "+gl_mon_b+" | Precio "+gl_mon_a, "Borrar"];
	var siz_colm = name_cel.length;
	//----------------------------------------------------------------

	var sect_table = document.getElementById("tablproductos");

	sect_table.innerHTML = "";

	var table = document.getElementById("table0");

	var tabla = document.createElement("table");
	tabla.setAttribute("id", "table0");

	// Creamos un elemento <table> y un elemento <tbody>
	var tblBody = document.createElement("tbody");

	// Creamos las celdas
	for (var j = 0; j < siz_colm; j++) {
		// Creamos las hileras de la tabla
		var fila = document.createElement("tr");

		fila.setAttribute("id", "fila"+j);
		fila.setAttribute("class","label_style");

		//fila.setAttribute("onmouseover", "cursor_en_fila("+j+");" );
		//fila.setAttribute("onmouseout", "cursor_no_fila("+j+");" );

		var multiplo = (j*table_col);
		save_id_filas[j] = j+multiplo;
		for (var i = 0; i < 3; i++) {

			var celda_id = i+""+j;
			//Cuadros de nombres de columnas
			if(i==0){
				var celda = document.createElement("td");

				celda.setAttribute("id", "celd"+celda_id)
				celda.setAttribute("class","celda_style");


				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("id", "input"+celda_id);
				input.setAttribute("type", "number");
				var tex_mask = document.createElement("input");
				input.setAttribute(edit_mode?"readwrite":"readonly", "");

				tex_mask.setAttribute("readonly", "");
				tex_mask.setAttribute("class", edit_mode?"input_style_edicion_td":"mask_style");
				if(i==0){

					input.setAttribute("type", "text");
					input.setAttribute("value", name_cel[j]);
					input.setAttribute("readonly", "");
					input.setAttribute("class","colum_name_style");
					//celda.appendChild(input);
					celda.innerHTML= input.outerHTML;
				}
				fila.appendChild(celda);

			}
			//--------------------------------------------------------------------------------------------------

			else {
				//lista_tx += add_text_fila(j);

				var celda = document.createElement("td");

				celda.setAttribute("id", "celd"+celda_id)
				celda.setAttribute("class","celda_style_table");

				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("type", "number");
				input.setAttribute(edit_mode?"readwrite":"readonly", "");

				var tex_mask = document.createElement("input");
				tex_mask.setAttribute("readonly", "");
				tex_mask.setAttribute("class", edit_mode?"input_style_edicion_td":"input_text_style");

				input.setAttribute("id", "input"+celda_id);

				//Cuadros de solo textos
				if (j==0 ){
					input.setAttribute("class","input_style_td");
					input.setAttribute("onclick","get_celda_value_test();");
					input.setAttribute("onkeyup","get_celda_value_test();");
					//input.setAttribute("onwheel","get_celda_value_test();");
					//input.setAttribute("onchange","enviar_index();");

					input.setAttribute("class",edit_mode?"input_style_edicion_td":"input_text_style");
					input.setAttribute("type", "text");
					celda.appendChild(input);
					input.setAttribute("onFocus", "ocultar_input();");
				}

				//Cuadros de entrada numerica
				if(j==1){
					input.setAttribute("onclick","get_celda_value_test();");
					input.setAttribute("onkeyup","get_celda_value_test();");
					input.setAttribute("onchange","get_celda_value_test();");
					//input.setAttribute("onchange","enviar_index();");

					input.setAttribute("class","input_style_hidden");

					input.setAttribute("step", "0.10");
					input.setAttribute("min", "0.00");
					input.setAttribute("lang", "en");

					//para la mask del cuadro
					tex_mask.setAttribute("id", "text_mask"+celda_id);
					celda.appendChild(tex_mask);
					celda.appendChild(input);

					var total_id_a = j;
					var total_id_b = multiplo;
					//input.setAttribute("onkeyup", "enviar_index("+total_id_a+","+total_id_b+");" );
					tex_mask.setAttribute("onClick", edit_mode?"mostrar_input();":"");
					tex_mask.setAttribute("onSelect", edit_mode?"mostrar_input();":"");
					input.setAttribute("onFocus", edit_mode?"ocultar_input();":"");

				}
				//Cuadros de texto no editables
				if (j==2){
					input.setAttribute("class","input_style_td");
					input.setAttribute("type", "text");
					input.setAttribute("disabled", "");	
					celda.appendChild(input);			
				}
				//Borrar
				if(j==3 ){
					if(i==1) {
						celda.setAttribute("class",  edit_mode?"celda_style_x":"input_style_hidden");
						var div = document.createElement("div");
						div.setAttribute("class","input_style_edicion_td");
						div.setAttribute("id", "listp_div");
						div.innerHTML= "Confirmar:";
						input.setAttribute("type","checkbox");
						input.setAttribute("id", "listp_check");
						div.appendChild(input);
						celda.appendChild(div);
					}
					if(i==2) {
						celda.setAttribute("class",  edit_mode?"celda_style_x":"input_style_hidden");
						var button = document.createElement("button");
						button.setAttribute("class","mask_style");
						button.setAttribute("type", "button");
						button.innerHTML= "Borrar Producto";
						button.setAttribute("onclick","remove_product();");
						button.setAttribute("id", "button"+j);
						celda.appendChild(button);
					}
				}
				fila.appendChild(celda);
			}
		}
		tblBody.appendChild(fila);
	}

	// posicionamos el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);

	// appends <table> into <body>
	//body.appendChild(tabla);

	sect_table.appendChild(tabla);  ///innerHTML = tabla.innerHTML;

	var r_margen = gl_products.genmargen;
	var r_precio = gl_products.genprecio;

	var precio = document.getElementById("input02");
	var margen = document.getElementById("input04");
	var precio_mask = document.getElementById("text_mask02");
	var margen_mask = document.getElementById("text_mask04");

	margen.value = r_margen;
	margen_mask.value = get_mask_simple(r_margen,"%");
	precio.value = r_precio;
	precio_mask.value = get_mask(r_precio,gl_mon_a);

	return null;
}

function create_table_rp(){

	//----------------------------------------------------------------
	//Nombre de las celdas value--------------------------------------
	var name_cel = ["Nombre", "Cantidad", "Ganancia C/U", "Precio", "Accion"];
	var name_siz = name_cel.length;
	//----------------------------------------------------------------

	var sect_table = document.getElementById("sect_rp");

	sect_table.innerHTML = "";

	var tabla = document.createElement("table");
	tabla.setAttribute("id", "table_rp");

	// Creamos un elemento <table> y un elemento <tbody>
	var tblBody = document.createElement("tbody");

	// Creamos las celdas
	var siz_col = gl_mobil? 2:name_siz;
	var siz_fil = gl_mobil? name_siz:2;
	for (var j = 0; j < siz_fil; j++) {
		// Creamos las hileras de la tabla
		var fila = document.createElement("tr");

		fila.setAttribute("id", "filarp"+j);

		var multiplo = (j*table_col);
		save_id_filas[j] = j+multiplo;
		for (var i = 0; i < siz_col; i++) {

			var siz_f = gl_mobil?i:j;
			var siz_c = gl_mobil?j:i;
			var celda_id = siz_f+""+siz_c;
			
			//Cuadros de nombres de columnas
			if(siz_f==0){
				var celda = document.createElement("td");

				celda.setAttribute("id", "celdrp"+celda_id)
				celda.setAttribute("class","celda_style");

				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("id", "inputrp"+celda_id);
				input.setAttribute("type", "number");
				var tex_mask = document.createElement("input");
				input.setAttribute(edit_mode?"readwrite":"readonly", "");

				tex_mask.setAttribute("readonly", "");
				tex_mask.setAttribute("class", "input_style_edicion_td");

				input.setAttribute("type", "text");
				input.setAttribute("value", name_cel[siz_c]);
				input.setAttribute("readonly", "");
				input.setAttribute("class","colum_name_style");
				//celda.appendChild(input);
				celda.innerHTML= input.outerHTML;
			
				fila.appendChild(celda);

			}
			//--------------------------------------------------------------------------------------------------

			else if(siz_f==1){
				//lista_tx += add_text_fila(j);

				var celda = document.createElement("td");
				celda.setAttribute("id", "celdrp"+celda_id)

				

				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("type", "number");
				var tex_mask = document.createElement("input");

				tex_mask.setAttribute("readonly", "");
				tex_mask.setAttribute("class", "input_style_edicion_td");
				tex_mask.setAttribute("placeholder", "Ingrese Valor");

				input.setAttribute("id", "inputrp"+celda_id);
				input.setAttribute("placeholder", "Ingrese Valor");

				//Cuadro De nombres
				if (siz_c==0){
					input.setAttribute("class","input_style_td");
					input.setAttribute("class","input_style_edicion_td");
					input.setAttribute("type", "text");
					celda.appendChild(input);
					input.setAttribute("onFocus", "ocultar_input();");
				}
				//Cuadro cantidad
				if (siz_c==1){
					input.setAttribute("class","input_style_td");
					input.setAttribute("class","input_style_edicion_td");
					input.setAttribute("type", "number");
					celda.appendChild(input);
					input.setAttribute("onFocus", "ocultar_input();");
				}
				//Cuadros de entrada numerica
				if(siz_c==2 || siz_c==3){
					input.setAttribute("class","input_style_td");
					input.setAttribute("onclick","get_celda_value_rp();");
					input.setAttribute("onkeyup","get_celda_value_rp();");
					input.setAttribute("onchange","get_celda_value_rp();");
					//input.setAttribute("onchange","enviar_index();");

					input.setAttribute("class","input_style_hidden");

					input.setAttribute("step", "0.10");
					input.setAttribute("min", "0.00");
					input.setAttribute("lang", "en");

					//para la mask del cuadro
					tex_mask.setAttribute("id", "text_maskrp"+celda_id);
					celda.appendChild(tex_mask);
					celda.appendChild(input);

					var total_id_a = j;
					var total_id_b = multiplo;
					//input.setAttribute("onkeyup", "enviar_index("+total_id_a+","+total_id_b+");" );
					tex_mask.setAttribute("onClick", "mostrar_input();");
					tex_mask.setAttribute("onSelect", "mostrar_input();");
					input.setAttribute("onFocus", "ocultar_input();");

				}
				if(siz_c==4){
					celda.setAttribute("class", "button_style_r");
					var button = document.createElement("button");
					button.setAttribute("class", "mask_style");
					button.setAttribute("type", "button");
					button.innerHTML= "Registrar";
					button.setAttribute("onclick","guardar_rp();");
					button.setAttribute("id", "buttrp"+j);
					celda.appendChild(button);
				}
				fila.appendChild(celda);
			}
		}
		tblBody.appendChild(fila);
	}

	// posicionamos el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);

	sect_table.appendChild(tabla);  ///innerHTML = tabla.innerHTML;

	return null;
}

function create_table_rv(){

	//----------------------------------------------------------------
	//Nombre de las celdas value--------------------------------------
	var name_cel = ["Producto", "Cant. Dispon.", "En Dolar", "En Bs", "Cant. Venta", "Accion"];
	var name_siz = name_cel.length;
	//----------------------------------------------------------------

	var sect_table = document.getElementById("sect_rv");

	sect_table.innerHTML = "";

	var tabla = document.createElement("table");
	tabla.setAttribute("id", "table_rv");

	// Creamos un elemento <table> y un elemento <tbody>
	var tblBody = document.createElement("tbody");

	// Creamos las celdas
	var siz_col = gl_mobil? 2:name_siz;
	var siz_fil = gl_mobil? name_siz:5;
	for (var j = 0; j < siz_fil; j++) {
		// Creamos las hileras de la tabla
		var fila = document.createElement("tr");

		fila.setAttribute("id", "filarv"+j);

		var multiplo = (j*table_col);
		save_id_filas[j] = j+multiplo;
		for (var i = 0; i < siz_col; i++) {

			var siz_f = gl_mobil?i:j;
			var siz_c = gl_mobil?j:i;
			var celda_id = siz_f+""+siz_c;
			
			//Cuadros de nombres de columnas
			if(siz_f==0){
				var celda = document.createElement("td");

				celda.setAttribute("id", "celdrv"+celda_id)
				celda.setAttribute("class","celda_style");

				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("id", "inputrv"+celda_id);
				input.setAttribute("type", "number");
				var tex_mask = document.createElement("input");
				input.setAttribute(edit_mode?"readwrite":"readonly", "");

				tex_mask.setAttribute("readonly", "");
				tex_mask.setAttribute("class", "input_style_edicion_td");

				input.setAttribute("type", "text");
				input.setAttribute("value", name_cel[siz_c]);
				input.setAttribute("readonly", "");
				input.setAttribute("class","colum_name_style");
				//celda.appendChild(input);
				celda.innerHTML= input.outerHTML;
			
				fila.appendChild(celda);

			}
			//--------------------------------------------------------------------------------------------------
			else if(siz_f>0){
				//lista_tx += add_text_fila(siz_f);
				var celda = document.createElement("td");
				celda.setAttribute("id", "celdrv"+celda_id)
				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("type", "number");

				input.setAttribute("id", "rvinput"+celda_id);


				//Cuadros de cantidad
				if (siz_c==4){
					//input.setAttribute("onclick","get_celda_value_test();");
					//input.setAttribute("onkeyup","get_celda_value_test();");
					//input.setAttribute("onwheel","get_celda_value_test();");
					//input.setAttribute("onchange","enviar_index();");

					input.setAttribute("class","input_style_visible");
					input.setAttribute("type", "number");
					input.setAttribute("step", "1");
					input.setAttribute("min", "1");
					input.setAttribute("lang", "en");
					celda.appendChild(input);
					input.setAttribute("onFocus", "ocultar_input();");
				}
				//Cuadros de entrada numerica
				else if (siz_c != 5){
					input.setAttribute("class","input_style_td");
					//input.setAttribute("onchange","enviar_index();");

					input.setAttribute("class","input_style_td");
					input.setAttribute("type", "text");
					input.setAttribute("readonly", "");

					celda.appendChild(input);

					var total_id_a = siz_f;
					var total_id_b = multiplo;
					//input.setAttribute("onkeyup", "enviar_index("+total_id_a+","+total_id_b+");" );

					input.setAttribute("onFocus", "ocultar_input();");

				}
				if(siz_c==5){
					celda.setAttribute("class", "button_style_r");
					var button = document.createElement("button");
					button.setAttribute("class", "mask_style");
					button.setAttribute("type", "button");
					button.innerHTML= "Registrar";
					button.setAttribute("onclick","button_reg_venta("+siz_f+");");
					button.setAttribute("id", "buttrv"+siz_f+"5");
					celda.appendChild(button);
				}
				fila.appendChild(celda);
			}
		}
		tblBody.appendChild(fila);
	}

	// posicionamos el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);

	sect_table.appendChild(tabla);  ///innerHTML = tabla.innerHTML;

	return null;
}




