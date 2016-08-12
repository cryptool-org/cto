<?php defined('_JEXEC') or die('Restricted access');?>
<?php JFactory::getDocument()->addScript('components/com_cto/js/lib/jquery.defaultvalue.js');?>
<?php JFactory::getDocument()->addScript('components/com_cto/js/lib/fallback.html5.input.pattern.js');?>
<?php JFactory::getDocument()->addScript('components/com_cto/js/lib/modernizr.min.js');?>
<form id="coordinate-calculator">
    
    <button id="gps-reset">Reset</button>
    <div class="clr"></div>
    
    <!-- Fieldset for degree, minutes, seconds (dms)-->
    <fieldset name="dms-fieldset" class="dms">
        <legend><?php echo JText::_('COM_CTO_GPS_DMS_LEGEND')?></legend>
        <div class="gps-latitude">
            <label><?php echo JText::_('COM_CTO_GPS_LABEL_LATITUDE')?>:</label>
            <input
                type="text"
                name="dms-d-lat"
                id="dms-d-input-lat"
                class="dms gps-single gps-degree"
                pattern="^[NS\-+]?([0-8]{0,1}[0-9]|90)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_D_PLACEHOLDER', "66")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_D_LAT')?>"
            />
            <input
                type="text"
                name="dms-m-lat"
                id="dms-m-input-lat"
                class="dms gps-single gps-minutes"
                pattern="^([0-5]{0,1}[0-9]|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_M_PLACEHOLDER', "43")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_M_S')?>"
            />
            <input
                type="text"
                name="dms-s-lat"
                id="dms-s-input-lat"
                class="dms gps-single gps-seconds"
                pattern="^([0-5]{0,1}[0-9]|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_S_PLACEHOLDER', "12")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_M_S')?>"
            />
            <div class="message">&nbsp;</div>
        </div>
        <div class="gps-longitude">
            <label><?php echo JText::_('COM_CTO_GPS_LABEL_LONGITUDE')?>:</label>
            <input
                type="text"
                name="dms-d-long"
                id="dms-d-input-long"
                class="dms gps-single gps-degree"
                pattern="^[EW]?([0-9]{0,1}[0-9]|1[0-7][0-9]|180)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_D_PLACEHOLDER', "66")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_D_LONG')?>"
            />
            <input
                type="text"
                name="dms-m-long"
                id="dms-m-input-long"
                class="dms gps-single gps-minutes"
                pattern="^([0-5]{0,1}[0-9]|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_M_PLACEHOLDER', "43")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_M_S')?>"
            />
            <input
                type="text"
                name="dms-s-long"
                id="dms-s-input-long"
                class="dms gps-single gps-seconds"
                pattern="^([0-5]{0,1}[0-9]|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_S_PLACEHOLDER', "12")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_M_S')?>"
            />
            <div class="message"></div>
        </div>
        
        <div class="gps-coordinates">
            <label><?php echo JText::_('COM_CTO_GPS_LABEL_COORDINATES')?>:</label>
            <input
                type="text"
                name="dms-all"
                id="dms-all-input"
                class="dms gps-all"
                pattern="^[+-NS]?(90° 0' 0&quot;|[0-8]{0,1}[0-9]°( [0-5]{0,1}[0-9]')?( [0-5]{0,1}[0-9]&quot;)?) [EW]?(180° 0' 0&quot;|([0-9]{0,1}[0-9]|1[0-7][0-9])°( [0-5]{0,1}[0-9]')?( [0-5]{0,1}[0-9]&quot;)?)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_ALL_PLACEHOLDER', "N52&deg; 31' 14&quot; E13&deg; 24' 34&quot;")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_ALL')?>"/>
        </div>
        
    </fieldset>
    
    <!-- Fieldset for degree, minutes, decimalseconds (dmds) -->
    <fieldset name="dmds-fieldset" class="ddms">
        <legend><?php echo JText::_('COM_CTO_GPS_DMDS_LEGEND')?></legend>
        <div class="gps-latitude">
        <label><?php echo JText::_('COM_CTO_GPS_LABEL_LATITUDE')?>:</label>
            <input
                type="text"
                name="dmds-d-lat"
                id="dmds-d-input-lat"
                class="dmds gps-single gps-degree"
                pattern="^[NS\-+]?([0-8]{0,1}[0-9]|90)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_D_PLACEHOLDER', "66")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_D_LAT')?>"
            />
            <input
                type="text"
                name="dmds-m-lat"
                id="dmds-m-input-lat"
                class="dmds gps-single gps-minutes"
                pattern="^([0-5]{0,1}[0-9]|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_M_PLACEHOLDER', "43")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_M_S')?>"
            />
            <input
                type="text"
                name="dmds-ds-lat"
                id="dmds-ds-input-lat"
                class="dmds gps-single gps-seconds"
                pattern="^([0-5]{0,1}[0-9](\.\d*)?|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMDS_DS_PLACEHOLDER', "12.0")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMDS_DS')?>"
            />
            <div class="message">&nbsp;</div>
        </div>
        
        <div class="gps-longitude">
        <label><?php echo JText::_('COM_CTO_GPS_LABEL_LONGITUDE')?>:</label>
            <input
                type="text"
                name="dmds-d-long"
                id="dmds-d-input-long"
                class="dmds gps-single gps-degree"
                pattern="^[EW]?([0-9]{0,1}[0-9]|1[0-7][0-9]|180)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_D_PLACEHOLDER', "66")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_D_LONG')?>"
            />
            <input
                type="text"
                name="dmds-m-long"
                id="dmds-m-input-long"
                class="dmds gps-single gps-minutes"
                pattern="^([0-5]{0,1}[0-9]|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_M_PLACEHOLDER', "43")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_M_S')?>"
            />
            <input
                type="text"
                name="dmds-ds-long"
                id="dmds-ds-input-long"
                class="dmds gps-single gps-seconds"
                pattern="^([0-5]{0,1}[0-9](\.\d*)?|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMDS_DS_PLACEHOLDER', "12.0")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMDS_DS')?>"
            />
            <div class="message">&nbsp;</div>
        </div>
        
        <div class="gps-coordinates">
            <label><?php echo JText::_('COM_CTO_GPS_LABEL_COORDINATES')?>:</label>
            <input
                type="text"
                name="dmds-all"
                id="dmds-all-input"
                class="dmds gps-all"
                pattern="^[+-NS]?(90° 0' 0&quot;|[0-8]?[0-9]°( [0-5]{0,1}[0-9]')?( [0-5]?[0-9](\.\d*)?&quot;)?) [EW]?(180° 0' 0&quot;|([0-9]?[0-9]|1[0-7][0-9])°( [0-5]?[0-9]')?( [0-5]?[0-9](\.\d*)?&quot;)?)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMDS_ALL_PLACEHOLDER', "N52&deg; 31' 14.941&quot; E13&deg; 24' 34.020&quot;")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMDS_ALL')?>"
            />
        </div>
        
    </fieldset>
    
    <!-- Fieldset for degree, decimalminutes (ddm) -->
    <fieldset name="ddm-fieldset" class="ddm">
        <legend><?php echo JText::_('COM_CTO_GPS_DDM_LEGEND')?></legend>
        <div class="gps-latitude">
        <label><?php echo JText::_('COM_CTO_GPS_LABEL_LATITUDE')?>:</label>
            <input
                type="text"
                name="ddm-d-lat"
                id="ddm-d-input-lat"
                class="ddm gps-single two-elements gps-degree"
                pattern="^[NS\-+]?([0-8]{0,1}[0-9]|90)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_D_PLACEHOLDER', "66")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_D_LAT')?>"
            />
            <input 
                type="text"
				name="ddm-m-lat" 
				id="ddm-dm-input-lat" 
				class="ddm gps-single two-elements gps-minutes" 
				pattern="^([0-5]{0,1}[0-9](\.\d*)?|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DDM_DM_PLACEHOLDER', "43.20")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMDS_DS')?>"
            />
            <div class="message">&nbsp;</div>
        </div>
        
        <div class="gps-longitude">
            <label><?php echo JText::_('COM_CTO_GPS_LABEL_LONGITUDE')?>:</label>
            <input 
				type="text" 
				name="ddm-d-long" 
				id="ddm-d-input-long" 
				class="ddm gps-single two-elements gps-degree" 
				pattern="^[EW]?([0-9]{0,1}[0-9]|1[0-7][0-9]|180)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_D_PLACEHOLDER', "66")?>" title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_D_LONG')?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMS_D_LONG')?>"
            />
            <input 
				type="text" 
				name="ddm-m-long" 
				id="ddm-dm-input-long" 
				class="ddm gps-single two-elements gps-minutes" 
				pattern="^([0-5]{0,1}[0-9](\.\d*)?|60)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DDM_DM_PLACEHOLDER', "43.20")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMDS_DS')?>"
            />
            <div class="message">&nbsp;</div>
        </div>
        
        <div class="gps-coordinates">
            <label><?php echo JText::_('COM_CTO_GPS_LABEL_COORDINATES')?>:</label>
            <input 
				type="text" 
				name="ddm-all" 
				id="ddm-all-input" 
				class="ddm gps-all" 
				pattern="^[NS\-+]?(90° 0'|[0-8]?[0-9]°( [0-5]?[0-9](\.\d+)?')?) [EW]?(180° 0'|([0-9]?[0-9]|1[0-7][0-9])°( [0-5]?[0-9](\.\d+)?')?)$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DDM_ALL_PLACEHOLDER', "N52&deg; 31.24902' E13&deg; 24.567'")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DMDS_ALL')?>"
            />
        </div>
        
    </fieldset>
    
    <!-- Fieldset for decimaldegree (dd) -->
    <fieldset name="dd-fieldset" class="dd">
        <legend><?php echo JText::_('COM_CTO_GPS_DD_LEGEND')?></legend>
        <div class="gps-latitude">
            <label><?php echo JText::_('COM_CTO_GPS_LABEL_LATITUDE')?>:</label>
            <input 
				type="text" 
				name="dd-dd-lat" 
				id="dd-dd-input-lat" 
				class="dd gps-single one-element gps-degree" 
				pattern="^[NS\-+]?(90(\.0+)?|[0-8]?[0-9](\.\d+)?)°?$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_D_PLACEHOLDER', "52.520817&deg;")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DD_DD_LAT')?>"
            />
        </div>
        
        <div class="gps-longitude">
            <label><?php echo JText::_('COM_CTO_GPS_LABEL_LONGITUDE')?>:</label>
            <input 
				type="text" 
				name="dd-dd-long" 
				id="dd-dd-input-long" 
				class="dd gps-single one-element gps-degree" 
				pattern="^[EW]?(180(\.0+)?|([0-9]?[0-9]|1[0-7][0-9])(\.\d+)?)°?$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DMS_D_PLACEHOLDER', "13.40945&deg;")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DD_DD_LONG')?>"
            />
        </div>
        
        <div class="gps-coordinates">
            <label><?php echo JText::_('COM_CTO_GPS_LABEL_COORDINATES')?>:</label>
            <input 
				type="text" 
				name="dd-all" 
				id="dd-all-input" 
				class="dd gps-all" 
				pattern="^[NS\-+]?(90(\.0+)?|[0-8]?[0-9](\.\d+)?)°? [EW\-+]?(180(\.0+)?|([0-9]?[0-9]|1[0-7][0-9])(\.\d+)?)°?$"
                placeholder="<?php echo JText::sprintf('COM_CTO_GPS_DD_ALL_PLACEHOLDER', "N52.520817&deg; E13.40945&deg;")?>"
                title="<?php echo JText::_('COM_CTO_GPS_PATTERN_TITLE_DD_ALL')?>"
            />
        </div>
    </fieldset>
    
    <!--<input type="submit" value="submit" name="submit"/>-->
</form>

<div>
    (<?php echo JText::_('COM_CTO_GPS_SOURCE')?>: <a href="http://rechneronline.de/geo-koordinaten/" alt="http://rechneronline.de/geo-koordinaten/">http://rechneronline.de/geo-koordinaten/</a>)
</div>