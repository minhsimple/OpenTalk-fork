import { format, transports, createLogger } from 'winston';

const logger = createLogger({
	format: format.combine(
		format.splat(),
		format.simple(),
	),
	transports: [new transports.Console()],
});

const logMessage = (level, message, ...meta) => ((process.env.NODE_ENV === 'development') ? logger.log(level, message, ...meta) : null);

export default logMessage;
