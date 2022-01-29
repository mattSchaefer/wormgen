class Token
    def build_token(data)
        secret = self.secret
        expire_frame = self.expiration_frame
        payload = {data: data, createdAt: DateTime.current, exp: Time.now.to_i + expire_frame}
        token = encode_token(payload, secret)

         token
    end
    def encode_token(payload,secret)
        JWT.encode payload, secret, 'HS256'
        rescue => error
            render json: {status: 500, body: 'very bad', error: error}
    end
    def decode_token(token)
        JWT.decode(token, self.secret)
        rescue => error
            render json: {status: 500, body: 'very bad', error: error}
    end
    def validate_token(token)
        decoded = decode_token(token)
        expired = Time.now.to_i < decoded.exp
        return_data = {expired: expired, decoded: decoded}
        return_data
    end
    private
        initialize(data)
            @data = data
        end
        def secret
            @secret = Rails.application.secrets.secret_key_base
        end
        def expiration_frame
            @expiration_frame = 60
        end
end