import { FetchBlobResponse } from 'rn-fetch-blob';

import { IUpload, IUploadFile, IUser } from '../../../definitions';
import { store } from '../../store/auxStore';
import { compareServerVersion } from '../helpers';
import { sendFileMessage as sendFileMessageV1 } from './sendFileMessage';
import { sendFileMessageV2 } from './sendFileMessageV2';

export const sendFileMessage = (
	rid: string,
	fileInfo: IUploadFile,
	tmid: string | undefined,
	server: string,
	user: Partial<Pick<IUser, 'id' | 'token'>>,
	isForceTryAgain?: boolean
): Promise<FetchBlobResponse | void> => {
	const { version: serverVersion } = store.getState().server;
	if (compareServerVersion(serverVersion, 'lowerThan', '6.9.0')) {
		return sendFileMessageV1(rid, fileInfo as IUpload, tmid, server, user, isForceTryAgain);
	}

	return sendFileMessageV2(rid, fileInfo, tmid, server, user, isForceTryAgain);
};
