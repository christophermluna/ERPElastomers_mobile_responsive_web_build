<div id="window_list_wrapper" >
    <div id="window_list_head">
        <strong>Tool Purchase Orders</strong>
    </div>
	<div>
		<table border="0" cellspacing="0" cellpadding="6" class="new_form_table">
			<tr>
				<th align="right" width="30%">
					From:
				</th>
				<th align="left" width="15%">
					<input type="date"  tabindex="1" id="from_date" style="width:75%" value="<?php echo date('Y-m-d',mktime(0, 0, 0, date("m")  , 1, date("Y"))); ?>" onchange="updatePageBehaviour();" />
				</th>
				<th align="right" width="10%">
					To:
				</th>
				<th align="left">
					<input type="date" tabindex="2" id="to_date" style="width:25%" value="<?php echo date("Y-m-d"); ?>" onchange="updatePageBehaviour();" />
				</th>
			</tr>			
		</table>
	</div>
    <div id="window_list_head">
        <strong>PO List</strong>
    </div>
	<div class="window_error">
		<div class="loading_txt"><span>Loading Data . . .</span></div>
	</div>
	<div id="window_list">
		<div id="content_body">
		</div>	
	</div>
</div>
