const { checkVersion } = require('../../lib/version_checker');

module.exports = function VersionChecker() {
  describe('Version Checker', () => {
    const minimumRequiredAppVersion = '2.2.2';

    test('With major issues', () => {
      const dataVersion = {
        currentAppVersion: '1.5.5',
        minimumRequiredAppVersion,
      };

      const result = checkVersion(dataVersion);

      expect(result).toEqual({
        updated: false,
        incompatible: 'major',
        minAllowedVersion: minimumRequiredAppVersion,
      });
    });

    test('With minor issues', () => {
      const dataVersion = {
        currentAppVersion: '2.1.0',
        minimumRequiredAppVersion,
      };

      const result = checkVersion(dataVersion);

      expect(result).toEqual({
        updated: false,
        incompatible: 'minor',
        minAllowedVersion: minimumRequiredAppVersion,
      });
    });

    test('With patch issues', () => {
      const dataVersion = {
        currentAppVersion: '2.2.0',
        minimumRequiredAppVersion,
      };

      const result = checkVersion(dataVersion);

      expect(result).toEqual({ updated: true });
    });

    test('With equal versions', () => {
      const dataVersion = {
        currentAppVersion: '2.2.2',
        minimumRequiredAppVersion,
      };

      const result = checkVersion(dataVersion);

      expect(result).toEqual({ updated: true });
    });

    test('With higher versions', () => {
      const dataVersion1 = {
        currentAppVersion: '3.1.0',
        minimumRequiredAppVersion,
      };
      const dataVersion2 = {
        currentAppVersion: '2.3.0',
        minimumRequiredAppVersion,
      };
      const dataVersion3 = {
        currentAppVersion: '2.2.5',
        minimumRequiredAppVersion,
      };

      const result1 = checkVersion(dataVersion1);
      const result2 = checkVersion(dataVersion2);
      const result3 = checkVersion(dataVersion3);

      expect(result1).toEqual({ updated: true });
      expect(result2).toEqual({ updated: true });
      expect(result3).toEqual({ updated: true });
    });

    test('With invalid input', () => {
      try {
        checkVersion({
          currentAppVersion: 'a.b.c',
          minimumRequiredAppVersion,
        });
      } catch (err) {
        expect(err.message).toBe('a cannot be converted to int');
      }

      try {
        checkVersion({
          currentAppVersion: '1.2',
          minimumRequiredAppVersion,
        });
      } catch (err) {
        expect(err.message).toBe('Version should be in the format `x.x.x`');
      }

      try {
        checkVersion({
          currentAppVersion: 123,
          minimumRequiredAppVersion,
        });
      } catch (err) {
        expect(err.message).toBe('versionParser only accepts string');
      }
    });
  });
};
