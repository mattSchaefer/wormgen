module Token
    extend ActiveSupport::Concern
    def build_token(data)
        secret = self.secret
        expire_frame = self.expiration_frame
        payload = {data: data, createdAt: DateTime.current, exp: Time.now.to_i + expire_frame}
        token = encode_token(payload, secret)
        return {token: token, pretty_expire: Time.at(Time.now.to_i + expire_frame)}
    end
    def encode_token(payload,secret)
        JWT.encode payload, secret, 'HS256'
    end
    def decode_token(token)
        JWT.decode(token, self.secret)
    end
    def validate_token(token)
        decoded = decode_token(token)
        expired = DateTime.now.to_i > decoded[0]['exp']
        return_data = {expired: expired, decoded: decoded}
        return_data
        rescue
            'unable to validate token'
    end
    def authorize_token(token, user_id)
        decoded = decode_token(token)
        expired = DateTime.now.to_i > decoded[0]['exp']
        return_data = {expired: expired, decoded: decoded}
        if decoded == user_id && User.find(user_id).activated && User.find(user_id).activated == true
            return_data = {message: 'authorized', status: 200}
        else
            return_data = {message: 'not authorized', status: 500}
        end
        return_data
    end
    def secret
        Rails.application.secrets.secret_key_base
    end
    def expiration_frame
        600
    end
    protected
        def jwt_expired(exception)
            render json: {exception: exception}
        end
    private
        
end