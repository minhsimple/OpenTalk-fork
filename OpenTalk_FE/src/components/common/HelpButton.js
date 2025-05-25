import { connect } from 'react-redux';
import config from 'appConfig/mainConfig';
import React, { Component, Fragment, useState, useEffect } from 'react';
import { Button, Popover, PopoverBody } from 'reactstrap';
import Intercom from './Intercom';

const routes = config.APP.ROUTES;

const dashboard = routes.DASHBOARD;

const HelpButton = ({ id }) => {
	const [isOpenIntercom, setIsOpenIntercom] = useState(false);
	const [isOpenQuickHelp, setIsOpenQuickHelp] = useState(false);

	const handleOpenIntercomClick = () => {
		setIsOpenIntercom(true);
		setIsOpenQuickHelp(!isOpenQuickHelp);
	};
	const handleOpenQuickHelp = () => {
		setIsOpenQuickHelp(!isOpenQuickHelp);
	};

	useEffect(() => {
		if (window.Intercom && isOpenIntercom) {
			window.Intercom('show');
			window.Intercom('update', {
				hide_default_launcher: false,
			});
		}
	}, [isOpenIntercom]);
	return (
		<Fragment>
			<button type="button" aria-label="Help" title="support" onClick={handleOpenQuickHelp} id={id} className="btn btn-action btn-nav border-0">Need help?</button>
			<Popover placement="bottom" isOpen={isOpenQuickHelp} target={id} toggle={handleOpenQuickHelp}>
				<PopoverBody>
					<ul className="popover-menu">
						<li><a href={dashboard.SUPPORT.URI} title="Launch help centre" id="launch-help-centre" className="btn btn-action btn-nav border-0" target="_blank"><i className="pr-2 fa fa-external-link" ></i>Launch help centre</a></li>
						<li><button type="button" aria-label="StartToChat" title="Start to chat" id="startToChat" className="btn btn-action btn-nav border-0"
							onClick={() => handleOpenIntercomClick()}>Start chat</button></li>
					</ul>
				</PopoverBody>
			</Popover>
			<Intercom isOpenIntercom={isOpenIntercom} setIsOpenIntercom={setIsOpenIntercom}/>
		</Fragment>
	);
};

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpButton);
