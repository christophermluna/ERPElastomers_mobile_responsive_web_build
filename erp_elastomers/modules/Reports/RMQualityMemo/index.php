<div id="window_list_wrapper" class="filter-table">
    <div id="window_list_head">
        <strong>Raw Material Quality Memo</strong>
        <!--<span id="button_add">New</span>-->
    </div>
    <form action="" onsubmit="return false;">
		<table border="0" cellspacing="0" cellpadding="6" class="new_form_table">
			<tr>
				<th align="right" width="25%">
					From:
				</th>
				<th align="left" width="25%">
					<input type="date"  tabindex="1" id="from_date" style="width:40%" value="<?php echo date("Y-m-d"); ?>" onchange="updatePageBehaviour();" />
				</th>
				<th align="right" width="5%">
					To:
				</th>
				<th align="left">
					<input type="date" tabindex="2" id="to_date" style="width:22%" value="<?php echo date("Y-m-d"); ?>" onchange="updatePageBehaviour();" />
				</th>				
			</tr>			
		</table>
	</form>
    <div id="window_list_head">
        <strong>Memo List</strong>
    </div>
	<div class="window_error">
		<div class="loading_txt"><span>Loading Data . . .</span></div>
	</div>
	<div id="content_tbl"></div>	
</div>