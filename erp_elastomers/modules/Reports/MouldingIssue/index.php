<div id="window_list_wrapper" class="filter-table">
    <div id="window_list_head">
        <strong>Moulding Issue</strong>
    </div>
    <form action="" onsubmit="return false;">
		<table border="0" cellspacing="0" cellpadding="6" class="new_form_table">
			<tr>
				<th align="right" width="30%">
					From:
				</th>
				<th align="left" width="15%">
					<input type="date"  tabindex="1" id="from_date" value="<?php echo date('Y-m-d',mktime(0, 0, 0, date("m")  , 1, date("Y"))); ?>" onchange="updatePageBehaviour();" />
				</th>
				<th align="right" width="15%">
					To:
				</th>
				<th align="left" >
					<input type="date" tabindex="2" id="to_date"  value="<?php echo date("Y-m-d",mktime(0, 0, 0, date("m")+1  , 1, date("Y"))); ?>" onchange="updatePageBehaviour();" />
				</th>
			</tr>
		</table>
		</form>
		<br />
		<div id="window_list_head">
			<strong>DC List</strong>
		</div>	
		<div id="window_list">
			<div class="window_error">
				<div class="loading_txt"><span>Loading Data . . .</span></div>
			</div>
			<div id="content_body">
			</div>
		</div>
    </div>		
</div>